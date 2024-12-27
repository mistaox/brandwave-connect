import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useBrandSubmit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from("brands")
        .insert([{
          owner_id: user.id,
          name: String(formData.get("name")),
          industry: formData.get("industry")?.toString() || null,
          company_size: formData.get("company_size")?.toString() || null,
          location: formData.get("location")?.toString() || null,
          website: formData.get("website")?.toString() || null,
          description: formData.get("description")?.toString() || null,
        }]);

      if (error) throw error;

      toast({
        title: "Brand added successfully",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["brands"] });
      
      // Close the dialog by clicking the close button
      const closeButton = document.querySelector('[data-dialog-close]');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    } catch (error: any) {
      toast({
        title: "Error adding brand",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};