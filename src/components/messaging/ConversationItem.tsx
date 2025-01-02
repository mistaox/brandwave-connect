import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from "@/types/conversation";
import { useAuth } from "@/contexts/AuthContext";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversationId: string) => void;
}

export const ConversationItem = ({ conversation, isSelected, onSelect }: ConversationItemProps) => {
  const { user } = useAuth();

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participant1.id === user?.id
      ? conversation.participant2
      : conversation.participant1;
  };

  const getLastMessage = (conversation: Conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "No messages yet";
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.content;
  };

  const otherParticipant = getOtherParticipant(conversation);
  const lastMessage = getLastMessage(conversation);

  return (
    <button
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      <Avatar>
        <AvatarImage src={otherParticipant.avatar_url || undefined} />
        <AvatarFallback>
          {otherParticipant.full_name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 text-left">
        <h3 className="font-medium">{otherParticipant.full_name}</h3>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        <p className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(conversation.last_message_at || ""), {
            addSuffix: true,
          })}
        </p>
      </div>
    </button>
  );
};