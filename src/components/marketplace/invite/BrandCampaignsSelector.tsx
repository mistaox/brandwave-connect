import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface BrandCampaignsSelectorProps {
  brandId: string | null;
  selectedCampaigns: string[];
  onCampaignToggle: (campaignId: string) => void;
}

export const BrandCampaignsSelector = ({
  brandId,
  selectedCampaigns,
  onCampaignToggle,
}: BrandCampaignsSelectorProps) => {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["brand-campaigns", brandId],
    queryFn: async () => {
      if (!brandId) return [];
      
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("brand_id", brandId)
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
    enabled: !!brandId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!campaigns?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No active campaigns available for this brand.
      </p>
    );
  }

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex items-center space-x-2">
            <Checkbox
              id={campaign.id}
              checked={selectedCampaigns.includes(campaign.id)}
              onCheckedChange={() => onCampaignToggle(campaign.id)}
            />
            <Label
              htmlFor={campaign.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {campaign.title}
            </Label>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};