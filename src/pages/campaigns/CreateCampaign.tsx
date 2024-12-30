import { useNavigate } from "react-router-dom";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      const { error } = await supabase.from("campaigns").insert({
        title: formData.get("title"),
        description: formData.get("description"),
        budget: Number(formData.get("budget")),
        requirements: formData.get("requirements"),
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date"),
        brand_id: formData.get("brand_id"),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <CampaignForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}