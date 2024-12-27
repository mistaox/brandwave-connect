import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const navigate = useNavigate();

  const getProposalStatusBadge = () => {
    if (!collaboration.proposal_status) return null;

    const statusColors = {
      draft: "bg-gray-500",
      submitted: "bg-blue-500",
      accepted: "bg-green-500",
      rejected: "bg-red-500",
      revision_requested: "bg-yellow-500",
    };

    return (
      <Badge className={statusColors[collaboration.proposal_status as keyof typeof statusColors]}>
        {collaboration.proposal_status.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              {showInfluencer 
                ? collaboration.influencer?.full_name 
                : collaboration.campaigns?.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {showInfluencer 
                ? `Campaign: ${collaboration.campaigns?.title}`
                : `Campaign by ${collaboration.campaigns?.brand?.name}`
              }
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/collaborations/${collaboration.id}`)}
          >
            View Details
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Status:</span>{" "}
            <span className="capitalize">{collaboration.status}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Proposal:</span>{" "}
            {getProposalStatusBadge() || "Not submitted"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};