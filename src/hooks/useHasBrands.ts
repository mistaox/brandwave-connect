import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Brand } from "@/types/brand";

export const useHasBrands = () => {
  const { data: brands, isLoading: loading, error } = useQuery({
    queryKey: ["user-brands"],
    queryFn: async () => {
      const { data: userBrands, error } = await supabase
        .from("brands")
        .select("*")
        .eq("owner_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      return userBrands as Brand[];
    }
  });

  return { brands, loading, error };
};