import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampaignsListProps {
  brandId?: string;
}

export const CampaignsList = ({ brandId }: CampaignsListProps) => {
  const navigate = useNavigate();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns", brandId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("brand_id", brandId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!brandId, // Only run query when brandId is defined
  });

  if (!brandId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground mb-4">Please select a brand to view campaigns</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Campaigns</h2>
        <Button onClick={() => navigate("/campaigns/create")}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {campaigns?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-4">No campaigns yet</p>
            <Button onClick={() => navigate("/campaigns/create")}>
              Create your first campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns?.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{campaign.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {campaign.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  >
                    View Details
                  </Button>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Budget:</span>{" "}
                    ${campaign.budget}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="capitalize">{campaign.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};