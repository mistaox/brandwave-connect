import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select(`
            *,
            sender:profiles!messages_sender_id_fkey(full_name, avatar_url)
          `)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (messagesError) throw messagesError;
        setMessages(messagesData || []);

        const { data: conversationData, error: conversationError } = await supabase
          .from("conversations")
          .select(`
            *,
            participant1:profiles!conversations_participant1_id_fkey(id, full_name, avatar_url),
            participant2:profiles!conversations_participant2_id_fkey(id, full_name, avatar_url)
          `)
          .eq("id", conversationId)
          .single();

        if (conversationError) throw conversationError;
        
        const other = conversationData.participant1.id === user?.id
          ? conversationData.participant2
          : conversationData.participant1;
        setOtherParticipant(other);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error loading messages",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          console.log("New message received:", payload);
          // Fetch the complete message with sender information
          const { data: newMessage, error } = await supabase
            .from("messages")
            .select(`
              *,
              sender:profiles!messages_sender_id_fkey(full_name, avatar_url)
            `)
            .eq("id", payload.new.id)
            .single();

          if (!error && newMessage) {
            setMessages((current) => [...current, newMessage]);
            // Play notification sound if message is from other participant
            if (newMessage.sender_id !== user?.id) {
              const audio = new Audio("/message-notification.mp3");
              audio.play().catch(console.error);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user, toast]);

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
      const { error: messageError } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        content: newMessage.trim(),
        sender_id: user.id,
        receiver_id: otherParticipant.id,
      });

      if (messageError) throw messageError;

      // Update conversation last_message_at
      const { error: conversationError } = await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);

      if (conversationError) throw conversationError;

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again",
        variant: "destructive",
      });
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
      <ConversationHeader otherParticipant={otherParticipant} />

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};