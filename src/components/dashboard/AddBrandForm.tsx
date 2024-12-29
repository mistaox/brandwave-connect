import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BrandFormFields } from "./forms/BrandFormFields";
import { useBrandSubmit } from "./forms/useBrandSubmit";

interface AddBrandFormProps {
  onSuccess?: () => void;
}

export const AddBrandForm = ({ onSuccess }: AddBrandFormProps) => {
  const { handleSubmit, loading } = useBrandSubmit(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BrandFormFields />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Brand
      </Button>
    </form>
  );
};