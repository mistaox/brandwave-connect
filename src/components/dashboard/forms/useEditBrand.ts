import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Brand } from "@/types/brand";

export const useEditBrand = (brand: Brand, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get("name")?.toString() || "",
      industry: formData.get("industry")?.toString() || null,
      company_size: formData.get("company_size")?.toString() || null,
      location: formData.get("location")?.toString() || null,
      website: formData.get("website")?.toString() || null,
      description: formData.get("description")?.toString() || null,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("brands")
        .update(updates)
        .eq("id", brand.id);

      if (error) throw error;

      toast({
        title: "Brand updated successfully",
        duration: 3000,
      });

      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Error updating brand",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};