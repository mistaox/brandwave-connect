import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url: string;
  };
}

interface MessagingInterfaceProps {
  conversationId: string | null;
}

export const MessagingInterface = ({ conversationId }: MessagingInterfaceProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherParticipant, setOtherParticipant] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select(`
            *,
            sender:sender_id(full_name, avatar_url)
          `)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (messagesError) throw messagesError;
        setMessages(messagesData || []);

        // Fetch conversation details
        const { data: conversationData, error: conversationError } = await supabase
          .from("conversations")
          .select(`
            *,
            participant1:participant1_id(id, full_name, avatar_url),
            participant2:participant2_id(id, full_name, avatar_url)
          `)
          .eq("id", conversationId)
          .single();

        if (conversationError) throw conversationError;
        
        // Set other participant
        const other = conversationData.participant1.id === user?.id
          ? conversationData.participant2
          : conversationData.participant1;
        setOtherParticipant(other);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log("Message change received:", payload);
          if (payload.eventType === "INSERT") {
            setMessages((current) => [...current, payload.new as Message]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !user) return;

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        content: newMessage.trim(),
        sender_id: user.id,
        receiver_id: otherParticipant.id,
      });

      if (error) throw error;

      // Update conversation last_message_at
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!conversationId) {
    return (
      <div className="h-[calc(100vh-12rem)] flex items-center justify-center text-gray-500">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {otherParticipant && (
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarImage src={otherParticipant.avatar_url} />
            <AvatarFallback>
              {otherParticipant.full_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{otherParticipant.full_name}</h2>
          </div>
        </div>
      )}

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender_id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender_id !== user?.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender?.avatar_url} />
                  <AvatarFallback>
                    {message.sender?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] ${
                  message.sender_id === user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                } rounded-lg p-3`}
              >
                <p>{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender_id === user?.id
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {formatDistanceToNow(new Date(message.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};