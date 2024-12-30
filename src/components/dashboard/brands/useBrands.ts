import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Brand } from "@/types/brand";

export const useBrands = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: ["brands", user?.id],
    queryFn: async () => {
      console.log("Fetching brands for user:", user?.id);
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("owner_id", user.id);

      if (error) {
        console.error("Error fetching brands:", error);
        toast({
          title: "Error loading brands",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Fetched brands:", data);
      return data as Brand[];
    },
    enabled: !!user?.id,
  });
};