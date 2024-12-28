import { Card, CardContent } from "@/components/ui/card";
import { ProposalStatus } from "@/components/proposals/ProposalStatus";
import { CollaborationHeader } from "./CollaborationHeader";
import { ViewProposalDialog } from "@/components/proposals/ViewProposalDialog";
import { ManageProposalDialog } from "@/components/proposals/ManageProposalDialog";
import { useAuth } from "@/contexts/AuthContext";

interface CollaborationItemProps {
  collaboration: {
    id: string;
    status: string;
    proposal_text: string | null;
    proposal_status: string | null;
    proposal_submitted_at: string | null;
    proposal_budget: number | null;
    proposal_timeline: string | null;
    proposal_deliverables: string[] | null;
    campaigns?: {
      title: string;
      brand?: {
        name: string;
        owner_id: string;
      };
    };
    influencer?: {
      full_name: string;
    };
  };
  showInfluencer?: boolean;
  onUpdate?: () => void;
}

export const CollaborationItem = ({ 
  collaboration, 
  showInfluencer,
  onUpdate 
}: CollaborationItemProps) => {
  const { user } = useAuth();
  const title = showInfluencer 
    ? collaboration.influencer?.full_name 
    : collaboration.campaigns?.title;

  const subtitle = showInfluencer 
    ? `Campaign: ${collaboration.campaigns?.title}`
    : `Campaign by ${collaboration.campaigns?.brand?.name}`;

  const isBrandOwner = user?.id === collaboration.campaigns?.brand?.owner_id;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <CollaborationHeader
          title={title || "Untitled"}
          subtitle={subtitle}
          collaborationId={collaboration.id}
        />
        
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-4">
            <span className="text-sm">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="capitalize">{collaboration.status}</span>
            </span>
            <span className="text-sm">
              <span className="text-muted-foreground">Proposal:</span>{" "}
              <ProposalStatus status={collaboration.proposal_status} />
            </span>
          </div>

          <div className="flex gap-2">
            {collaboration.proposal_submitted_at && (
              <ViewProposalDialog proposal={collaboration} />
            )}
            {isBrandOwner && collaboration.proposal_submitted_at && (
              <ManageProposalDialog
                collaborationId={collaboration.id}
                currentStatus={collaboration.proposal_status}
                onStatusUpdate={onUpdate || (() => {})}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};