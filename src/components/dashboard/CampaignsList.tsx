import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface CampaignsListProps {
  brandId?: string;
  mode?: 'brand' | 'influencer';
}

interface GroupedCampaigns {
  [brandId: string]: {
    brandName: string;
    brandIndustry: string;
    campaigns: any[];
  };
}

export const CampaignsList = ({ brandId, mode = 'brand' }: CampaignsListProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (brandId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [brandId]: !prev[brandId]
    }));
  };

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns", brandId, mode],
    queryFn: async () => {
      console.log('Starting campaign query execution');
      let excludedCampaignIds: string[] = [];
      
      if (mode === 'influencer' && user?.id) {
        const { data: existingCollaborations, error: collabError } = await supabase
          .from("collaborations")
          .select("campaign_id")
          .eq("influencer_id", user.id);
        
        if (collabError) throw collabError;
        excludedCampaignIds = existingCollaborations?.map(c => c.campaign_id) || [];
      }

      let query = supabase
        .from("campaigns")
        .select(`
          *,
          brand:brands(
            id,
            name,
            industry,
            location
          )
        `);

      if (mode === 'brand' && brandId) {
        query = query.eq("brand_id", brandId);
      } else if (mode === 'influencer') {
        query = query.eq("status", "active");
        if (excludedCampaignIds.length > 0) {
          query = query.not("id", "in", `(${excludedCampaignIds.join(",")})`);
        }
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: mode === 'brand' ? !!brandId : true,
  });

  if (error) {
    console.error('Query error:', error);
  }

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

  // Group campaigns by brand
  const groupedCampaigns = campaigns?.reduce((acc: GroupedCampaigns, campaign) => {
    const brandId = campaign.brand?.id;
    if (!brandId) return acc;

    if (!acc[brandId]) {
      acc[brandId] = {
        brandName: campaign.brand?.name || 'Unknown Brand',
        brandIndustry: campaign.brand?.industry || '',
        campaigns: []
      };
    }
    acc[brandId].campaigns.push(campaign);
    return acc;
  }, {});

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

      {!campaigns?.length ? (
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
        <div className="space-y-4">
          {Object.entries(groupedCampaigns || {}).map(([brandId, { brandName, brandIndustry, campaigns }]) => (
            <Collapsible
              key={brandId}
              open={openGroups[brandId]}
              onOpenChange={() => toggleGroup(brandId)}
              className="border rounded-lg p-4"
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-lg font-semibold">{brandName}</h3>
                  <p className="text-sm text-muted-foreground">{brandIndustry}</p>
                </div>
                {openGroups[brandId] ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                {campaigns.map((campaign: any) => (
                  <Card key={campaign.id} className="hover:shadow-md transition-shadow">
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
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};