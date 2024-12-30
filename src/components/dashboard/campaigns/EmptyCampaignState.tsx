import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface EmptyCampaignStateProps {
  mode?: 'brand' | 'influencer';
  showCreateButton?: boolean;
}

export const EmptyCampaignState = ({ mode = 'brand', showCreateButton = false }: EmptyCampaignStateProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground mb-4">
          {mode === 'brand' ? 'No campaigns yet' : 'No available campaigns at the moment'}
        </p>
        {showCreateButton && (
          <Button onClick={() => navigate(`/dashboard/brand/campaigns/new`)}>
            Create your first campaign
          </Button>
        )}
      </CardContent>
    </Card>
  );
};