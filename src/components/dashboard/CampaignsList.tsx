import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CampaignsListProps {
  brandId: string;
}

export const CampaignsList = ({ brandId }: CampaignsListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: campaigns, isLoading, refetch } = useQuery({
    queryKey: ['campaigns', brandId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('brand_id', brandId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!brandId,
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const { error } = await supabase
        .from("campaigns")
        .insert([{
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          budget: Number(formData.get("budget")),
          requirements: formData.get("requirements") as string,
          start_date: formData.get("start_date") as string,
          end_date: formData.get("end_date") as string,
          brand_id: formData.get("brand_id") as string,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      setIsOpen(false);
      refetch(); // Refresh the campaigns list
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <CampaignForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      {campaigns?.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No campaigns yet. Create your first campaign!
        </div>
      ) : (
        <div className="grid gap-4">
          {campaigns?.map((campaign) => (
            <div
              key={campaign.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="font-semibold">{campaign.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {campaign.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  Budget: ${campaign.budget}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};