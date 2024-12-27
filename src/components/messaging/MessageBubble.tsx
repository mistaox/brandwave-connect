import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    sender?: {
      full_name: string;
      avatar_url: string;
    };
  };
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { user } = useAuth();
  const isCurrentUser = message.sender_id === user?.id;

  return (
    <div
      className={`flex gap-2 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender?.avatar_url} />
          <AvatarFallback>
            {message.sender?.full_name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] ${
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-100"
        } rounded-lg p-3`}
      >
        <p>{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isCurrentUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formatDistanceToNow(new Date(message.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};