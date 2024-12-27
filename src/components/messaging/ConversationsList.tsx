import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ConversationsListProps {
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const ConversationsList = ({
  selectedConversation,
  onSelectConversation,
}: ConversationsListProps) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await supabase
          .from("conversations")
          .select(`
            *,
            participant1:participant1_id(id, full_name, avatar_url),
            participant2:participant2_id(id, full_name, avatar_url),
            messages!messages_conversation_id_fkey(
              id,
              content,
              created_at,
              sender_id
            )
          `)
          .or(`participant1_id.eq.${user?.id},participant2_id.eq.${user?.id}`)
          .order("last_message_at", { ascending: false });

        if (error) throw error;
        setConversations(data || []);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast({
          title: "Error loading conversations",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to conversation updates
    const channel = supabase
      .channel("conversations-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `participant1_id=eq.${user?.id}`,
        },
        () => fetchConversations()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `participant2_id=eq.${user?.id}`,
        },
        () => fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  const getOtherParticipant = (conversation: any) => {
    return conversation.participant1.id === user?.id
      ? conversation.participant2
      : conversation.participant1;
  };

  const getLastMessage = (conversation: any) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "No messages yet";
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.content;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-full">
        <div className="space-y-2 p-4">
          {conversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation);
            const lastMessage = getLastMessage(conversation);
            return (
              <button
                key={conversation.id}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  selectedConversation === conversation.id
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <Avatar>
                  <AvatarImage src={otherParticipant.avatar_url} />
                  <AvatarFallback>
                    {otherParticipant.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{otherParticipant.full_name}</h3>
                  <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(conversation.last_message_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};