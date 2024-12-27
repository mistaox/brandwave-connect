import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AvailableCampaigns = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["available-campaigns"],
    queryFn: async () => {
      // Get campaigns that the influencer hasn't collaborated on yet
      const { data: existingCollaborations } = await supabase
        .from("collaborations")
        .select("campaign_id")
        .eq("influencer_id", user?.id);

      const excludedCampaignIds = existingCollaborations?.map(c => c.campaign_id) || [];

      const { data, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          brand:brands(
            name,
            industry,
            location
          )
        `)
        .eq("status", "active")
        .not("id", "in", `(${excludedCampaignIds.join(",")})`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleApply = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from("collaborations")
        .insert({
          campaign_id: campaignId,
          influencer_id: user?.id,
          status: "pending"
        });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "Your application has been sent to the brand.",
      });
    } catch (error) {
      console.error("Error applying to campaign:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground">No available campaigns at the moment</p>
          </CardContent>
        </Card>
      ) : (
        campaigns?.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {campaign.brand?.name} • {campaign.brand?.industry}
                  </p>
                  <p className="text-sm mt-2">{campaign.description}</p>
                </div>
                <Button onClick={() => handleApply(campaign.id)}>
                  Apply Now
                </Button>
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
        ))
      )}
    </div>
  );
};