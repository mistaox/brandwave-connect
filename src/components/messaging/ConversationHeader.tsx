import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationHeaderProps {
  otherParticipant: {
    full_name: string;
    avatar_url: string;
  } | null;
}

export const ConversationHeader = ({
  otherParticipant,
}: ConversationHeaderProps) => {
  if (!otherParticipant) return null;

  return (
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
  );
};