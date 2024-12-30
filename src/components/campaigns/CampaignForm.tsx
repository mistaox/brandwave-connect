import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BrandSelector } from "./form/BrandSelector";
import { CampaignFormFields } from "./form/CampaignFormFields";
import { useCampaignSubmit } from "./form/useCampaignSubmit";

interface CampaignFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
  defaultValues?: {
    title?: string;
    description?: string;
    budget?: number;
    requirements?: string;
    start_date?: string;
    end_date?: string;
    brand_id?: string;
  };
}

export const CampaignForm = ({ onSubmit, loading, defaultValues }: CampaignFormProps) => {
  const { handleSubmit } = useCampaignSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <BrandSelector defaultValue={defaultValues?.brand_id} />
      <CampaignFormFields defaultValues={defaultValues} />
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Campaign...
            </>
          ) : (
            "Create Campaign"
          )}
        </Button>
      </div>
    </form>
  );
};