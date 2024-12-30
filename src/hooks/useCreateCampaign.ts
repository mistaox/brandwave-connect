import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCreateCampaign = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createCampaign = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const campaign = {
        title: String(formData.get("title")),
        description: String(formData.get("description")),
        budget: formData.get("budget") ? parseFloat(String(formData.get("budget"))) : null,
        requirements: String(formData.get("requirements")),
        start_date: String(formData.get("start_date")),
        end_date: String(formData.get("end_date")),
        brand_id: String(formData.get("brand_id")),
        status: "active",
      };

      const { error } = await supabase
        .from("campaigns")
        .insert(campaign);

      if (error) throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return { createCampaign, isCreating };
};