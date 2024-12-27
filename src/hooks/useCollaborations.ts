import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCollaborations = (brandId?: string, influencerId?: string) => {
  return useQuery({
    queryKey: ["collaborations", brandId, influencerId],
    queryFn: async () => {
      let query = supabase
        .from("collaborations")
        .select(`
          *,
          campaigns:campaigns(
            *,
            brand:brands(
              id,
              name
            )
          ),
          influencer:profiles(*)
        `);

      if (brandId) {
        query = query.eq("campaigns.brand_id", brandId);
      } else if (influencerId) {
        query = query.eq("influencer_id", influencerId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!(brandId || influencerId),
  });
};