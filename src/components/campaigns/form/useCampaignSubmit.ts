import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const useCampaignSubmit = (onSubmit: (formData: FormData) => Promise<void>) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: brands } = useQuery({
    queryKey: ["userBrands", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("brands")
        .select("id, name")
        .eq("owner_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const selectedBrandId = formData.get("brand_id") as string;
    const isOwnedBrand = brands?.some(brand => brand.id === selectedBrandId);
    
    if (!isOwnedBrand) {
      toast({
        title: "Error",
        description: "You can only create campaigns for brands you own",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
    } catch (error: any) {
      console.error("Campaign creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  return { handleSubmit };
};