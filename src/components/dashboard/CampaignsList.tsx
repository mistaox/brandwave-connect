import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { CampaignGroup } from "./campaigns/CampaignGroup";
import { EmptyCampaignState } from "./campaigns/EmptyCampaignState";
import { useCampaigns } from "./campaigns/useCampaigns";

interface CampaignsListProps {
  brandId?: string;
  mode?: 'brand' | 'influencer';
}

interface GroupedCampaigns {
  [brandId: string]: {
    brandName: string;
    brandIndustry: string;
    campaigns: any[];
  };
}

export const CampaignsList = ({ brandId, mode = 'brand' }: CampaignsListProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const { data: campaigns, isLoading, error } = useCampaigns({ 
    brandId, 
    mode, 
    userId: user?.id 
  });

  const toggleGroup = (brandId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [brandId]: !prev[brandId]
    }));
  };

  if (error) {
    console.error('Query error:', error);
  }

  if (mode === 'brand' && !brandId) {
    return <EmptyCampaignState mode={mode} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Group campaigns by brand
  const groupedCampaigns = campaigns?.reduce((acc: GroupedCampaigns, campaign) => {
    const brandId = campaign.brand?.id;
    if (!brandId) return acc;

    if (!acc[brandId]) {
      acc[brandId] = {
        brandName: campaign.brand?.name || 'Unknown Brand',
        brandIndustry: campaign.brand?.industry || '',
        campaigns: []
      };
    }
    acc[brandId].campaigns.push(campaign);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {mode === 'brand' ? 'Your Campaigns' : 'Available Campaigns'}
        </h2>
        {mode === 'brand' && (
          <Button onClick={() => navigate(`/dashboard/brand/campaigns/new`)}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        )}
      </div>

      {!campaigns?.length ? (
        <EmptyCampaignState 
          mode={mode} 
          showCreateButton={mode === 'brand'} 
        />
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedCampaigns || {}).map(([brandId, { brandName, brandIndustry, campaigns }]) => (
            <CampaignGroup
              key={brandId}
              brandId={brandId}
              brandName={brandName}
              brandIndustry={brandIndustry}
              campaigns={campaigns}
              isOpen={openGroups[brandId]}
              onToggle={toggleGroup}
              mode={mode}
            />
          ))}
        </div>
      )}
    </div>
  );
};