import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CollaborationItemProps {
  collaboration: {
    id: string;
    status: string;
    proposal_text: string | null;
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
            {collaboration.proposal_text ? "Submitted" : "Pending"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};