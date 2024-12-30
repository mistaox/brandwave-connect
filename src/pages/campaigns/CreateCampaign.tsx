import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const CreateCampaign = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a campaign",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First, get the user's brand
      const { data: brands, error: brandError } = await supabase
        .from("brands")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (brandError || !brands) {
        throw new Error("No brand found for this user");
      }

      const campaign = {
        title: formData.get("title"),
        description: formData.get("description"),
        budget: parseFloat(formData.get("budget") as string),
        requirements: formData.get("requirements"),
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date"),
        brand_id: brands.id,
        status: "active",
      };

      const { error } = await supabase
        .from("campaigns")
        .insert([campaign]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      navigate("/dashboard/brand");
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <CampaignForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateCampaign;