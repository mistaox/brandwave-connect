import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";

interface CampaignsListProps {
  brandId: string;
}

export const CampaignsList = ({ brandId }: CampaignsListProps) => {
  const navigate = useNavigate();

  const { data: campaigns, isLoading } = useQuery({
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

  const handleNewCampaign = () => {
    navigate('/campaigns/create');
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
        <Button onClick={handleNewCampaign}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
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