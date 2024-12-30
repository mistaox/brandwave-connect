import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CampaignCard } from "@/components/marketplace/CampaignCard";
import { LoadingSpinner } from "./brand/LoadingSpinner";

export const CampaignsList = () => {
  const navigate = useNavigate();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      console.log('Starting campaign query execution');
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          brand:brands(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleNewCampaign = () => {
    navigate("/campaigns/create");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Campaigns</h2>
        <Button onClick={handleNewCampaign}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {campaigns?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No campaigns yet. Create your first campaign!</p>
        </div>
      )}
    </div>
  );
};