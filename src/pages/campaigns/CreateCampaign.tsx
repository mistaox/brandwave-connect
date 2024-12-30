import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHasBrands } from "@/hooks/useHasBrands";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { useCreateCampaign } from "@/hooks/useCreateCampaign";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brands, loading, error } = useHasBrands();
  const { createCampaign, isCreating } = useCreateCampaign();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !brands || brands.length === 0) {
    toast({
      title: "Error",
      description: "Unable to load brand information. Please try again.",
      variant: "destructive",
    });
    navigate("/dashboard/brand");
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      await createCampaign(formData);
      toast({
        title: "Success",
        description: "Campaign created successfully!",
      });
      navigate("/dashboard/brand");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignForm
            onSubmit={handleSubmit}
            loading={isCreating}
            brands={brands}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;