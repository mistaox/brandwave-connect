import { Card, CardContent } from "@/components/ui/card";
import { ProposalStatus } from "@/components/proposals/ProposalStatus";
import { CollaborationHeader } from "./CollaborationHeader";

interface CollaborationItemProps {
  collaboration: {
    id: string;
    status: string;
    proposal_text: string | null;
    proposal_status: string | null;
    proposal_submitted_at: string | null;
    campaigns?: {
      title: string;
      brand?: {
        name: string;
      };
    };
    influencer?: {
      full_name: string;
    };
  };
  showInfluencer?: boolean;
}

export const CollaborationItem = ({ collaboration, showInfluencer }: CollaborationItemProps) => {
  const title = showInfluencer 
    ? collaboration.influencer?.full_name 
    : collaboration.campaigns?.title;

  const subtitle = showInfluencer 
    ? `Campaign: ${collaboration.campaigns?.title}`
    : `Campaign by ${collaboration.campaigns?.brand?.name}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <CollaborationHeader
          title={title || "Untitled"}
          subtitle={subtitle}
          collaborationId={collaboration.id}
        />
        
        <div className="flex gap-4 mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Status:</span>{" "}
            <span className="capitalize">{collaboration.status}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Proposal:</span>{" "}
            <ProposalStatus status={collaboration.proposal_status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};