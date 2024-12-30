import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CampaignCard } from "./CampaignCard";

interface CampaignGroupProps {
  brandId: string;
  brandName: string;
  brandIndustry: string;
  campaigns: any[];
  isOpen: boolean;
  onToggle: (brandId: string) => void;
  mode?: 'brand' | 'influencer';
}

export const CampaignGroup = ({
  brandId,
  brandName,
  brandIndustry,
  campaigns,
  isOpen,
  onToggle,
  mode = 'brand'
}: CampaignGroupProps) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => onToggle(brandId)}
      className="border rounded-lg p-4"
    >
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-lg font-semibold">{brandName}</h3>
          <p className="text-sm text-muted-foreground">{brandIndustry}</p>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            mode={mode}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};