import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useHasBrands = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["hasBrands", user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { count, error } = await supabase
        .from("brands")
        .select("*", { count: 'exact', head: true })
        .eq("owner_id", user.id);

      if (error) {
        console.error("Error checking brands:", error);
        throw error;
      }

      return count ? count > 0 : false;
    },
    enabled: !!user?.id,
  });
};