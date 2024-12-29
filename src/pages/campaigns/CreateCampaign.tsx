import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Loader2 } from "lucide-react";

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Fetch brands for the current user
  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: ["user-brands", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("No user ID");
      
      const { data, error } = await supabase
        .from("brands")
        .select("id, name")
        .eq("owner_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSubmit = async (formData: FormData) => {
    if (!user || !brands?.length) {
      toast({
        title: "Error",
        description: "Please create a brand first before creating a campaign",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    const brandId = formData.get("brand_id")?.toString();
    if (!brandId) {
      toast({
        title: "Error",
        description: "Please select a brand for this campaign",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("campaigns").insert([{
        brand_id: brandId,
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        budget: formData.get("budget") ? Number(formData.get("budget")) : null,
        requirements: formData.get("requirements")?.toString(),
        start_date: formData.get("start_date")?.toString(),
        end_date: formData.get("end_date")?.toString(),
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

  if (brandsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (!brands?.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Create a Brand First</h1>
            <p className="text-gray-600 mb-6">
              You need to create a brand before you can create campaigns.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
          <CampaignForm onSubmit={handleSubmit} loading={loading} brands={brands} />
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;
