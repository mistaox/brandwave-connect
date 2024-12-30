import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    budget: number;
    brand?: {
      location?: string;
    };
  };
  mode?: 'brand' | 'influencer';
}

export const CampaignCard = ({ campaign, mode = 'brand' }: CampaignCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{campaign.title}</h3>
            <p className="text-sm mt-2">{campaign.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              View Details
            </Button>
            {mode === 'brand' && (
              <Button
                variant="outline"
                onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Budget:</span>{" "}
            ${campaign.budget}
          </div>
          {campaign.brand?.location && (
            <div className="text-sm">
              <span className="text-muted-foreground">Location:</span>{" "}
              {campaign.brand.location}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};