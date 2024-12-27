import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BrandFormFields } from "./forms/BrandFormFields";
import { useEditBrand } from "./forms/useEditBrand";
import { Brand } from "@/types/brand";

interface EditBrandFormProps {
  brand: Brand;
  onSuccess?: () => void;
}

export const EditBrandForm = ({ brand, onSuccess }: EditBrandFormProps) => {
  const { handleSubmit, loading } = useEditBrand(brand, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BrandFormFields defaultValues={brand} />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
};