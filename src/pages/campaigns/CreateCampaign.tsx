import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (!user) return;
    setLoading(true);

    try {
      // First, get the brand ID for the current user
      const { data: brands, error: brandError } = await supabase
        .from("brands")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (brandError) throw brandError;
      if (!brands?.id) throw new Error("No brand found for user");

      const title = formData.get("title");
      const description = formData.get("description");
      const budget = formData.get("budget");
      const requirements = formData.get("requirements");
      const start_date = formData.get("start_date");
      const end_date = formData.get("end_date");

      if (!title || typeof title !== "string") throw new Error("Title is required");

      const { error } = await supabase.from("campaigns").insert([{
        brand_id: brands.id,
        title,
        description: description?.toString() || null,
        budget: budget ? Number(budget) : null,
        requirements: requirements?.toString() || null,
        start_date: start_date?.toString() || null,
        end_date: end_date?.toString() || null,
        status: "draft",
      }]);

      if (error) throw error;

      toast({
        title: "Campaign created successfully",
        description: "You can now start receiving collaboration requests",
      });

      navigate("/campaigns");
    } catch (error: any) {
      toast({
        title: "Error creating campaign",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
          <CampaignForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;