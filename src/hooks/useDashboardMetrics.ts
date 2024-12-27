import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardMetrics = (brandId?: string) => {
  const { data: campaignsCount } = useQuery({
    queryKey: ["campaigns-count", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { count, error } = await supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true })
        .eq("brand_id", brandId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!brandId,
  });

  const { data: collaborationsCount } = useQuery({
    queryKey: ["collaborations-count", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { count, error } = await supabase
        .from("collaborations")
        .select("campaigns!inner(*)", { count: "exact", head: true })
        .eq("campaigns.brand_id", brandId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!brandId,
  });

  const { data: totalBudget } = useQuery({
    queryKey: ["total-budget", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { data, error } = await supabase
        .from("campaigns")
        .select("budget")
        .eq("brand_id", brandId);
      
      if (error) throw error;
      return data.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
    },
    enabled: !!brandId,
  });

  return {
    campaignsCount: campaignsCount?.toString() || "0",
    collaborationsCount: collaborationsCount?.toString() || "0",
    totalBudget: totalBudget || 0,
  };
};