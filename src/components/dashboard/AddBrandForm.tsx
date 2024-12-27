import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BrandFormFields } from "./forms/BrandFormFields";
import { useBrandSubmit } from "./forms/useBrandSubmit";

export const AddBrandForm = () => {
  const { handleSubmit, loading } = useBrandSubmit();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BrandFormFields />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Brand
      </Button>
    </form>
  );
};