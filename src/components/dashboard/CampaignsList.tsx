import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface CampaignsListProps {
  brandId?: string;
  mode?: 'brand' | 'influencer';
}

export const CampaignsList = ({ brandId, mode = 'brand' }: CampaignsListProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns", brandId, mode],
    queryFn: async () => {
      // First, get existing collaborations for the influencer
      let excludedCampaignIds: string[] = [];
      
      if (mode === 'influencer' && user?.id) {
        const { data: existingCollaborations } = await supabase
          .from("collaborations")
          .select("campaign_id")
          .eq("influencer_id", user.id);
        
        excludedCampaignIds = existingCollaborations?.map(c => c.campaign_id) || [];
      }

      // Build the base query
      let query = supabase
        .from("campaigns")
        .select(`
          *,
          brand:brands(
            name,
            industry,
            location
          )
        `);

      // Apply filters based on mode
      if (mode === 'brand' && brandId) {
        query = query.eq("brand_id", brandId);
      } else if (mode === 'influencer') {
        // For influencers, show only active campaigns they haven't collaborated on
        query = query.eq("status", "active");
        if (excludedCampaignIds.length > 0) {
          query = query.not("id", "in", `(${excludedCampaignIds.join(",")})`);
        }
      }

      // Add ordering
      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: mode === 'brand' ? !!brandId : true, // Enable for influencer mode regardless of brandId
  });

  if (mode === 'brand' && !brandId) {
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
        <h2 className="text-xl font-semibold">
          {mode === 'brand' ? 'Your Campaigns' : 'Available Campaigns'}
        </h2>
        {mode === 'brand' && (
          <Button onClick={() => navigate("/campaigns/create")}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        )}
      </div>

      {campaigns?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-4">
              {mode === 'brand' ? 'No campaigns yet' : 'No available campaigns at the moment'}
            </p>
            {mode === 'brand' && (
              <Button onClick={() => navigate("/campaigns/create")}>
                Create your first campaign
              </Button>
            )}
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
                    <p className="text-sm text-muted-foreground mt-1">
                      by {campaign.brand?.name} • {campaign.brand?.industry}
                    </p>
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
          ))}
        </div>
      )}
    </div>
  );
};