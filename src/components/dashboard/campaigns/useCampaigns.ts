import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UseCampaignsProps {
  brandId?: string;
  mode?: 'brand' | 'influencer';
  userId?: string;
}

export const useCampaigns = ({ brandId, mode = 'brand', userId }: UseCampaignsProps) => {
  return useQuery({
    queryKey: ["campaigns", brandId, mode],
    queryFn: async () => {
      console.log('Starting campaign query execution');
      let excludedCampaignIds: string[] = [];
      
      if (mode === 'influencer' && userId) {
        const { data: existingCollaborations, error: collabError } = await supabase
          .from("collaborations")
          .select("campaign_id")
          .eq("influencer_id", userId);
        
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
};