import { ConversationItem } from "./ConversationItem";
import { Conversation } from "@/types/conversation";

interface CampaignGroupProps {
  campaignTitle: string;
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const CampaignGroup = ({
  campaignTitle,
  conversations,
  selectedConversation,
  onSelectConversation,
}: CampaignGroupProps) => {
  return (
    <div className="ml-4 mb-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-2">
        {campaignTitle}
      </h4>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation === conversation.id}
            onSelect={onSelectConversation}
          />
        ))}
      </div>
    </div>
  );
};