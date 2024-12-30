import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddBrandForm } from "./AddBrandForm";
import { Brand } from "@/types/brand";
import { useState } from "react";
import { EmptyBrandState } from "./brands/EmptyBrandState";
import { BrandCard } from "./brands/BrandCard";
import { useBrands } from "./brands/useBrands";

interface BrandsListProps {
  onBrandSelect?: (brandId: string) => void;
}

export const BrandsList = ({ onBrandSelect }: BrandsListProps) => {
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const { data: brands, isLoading, refetch } = useBrands();

  const handleEditSuccess = () => {
    refetch();
    setEditingBrand(null);
  };

  const handleAddSuccess = () => {
    refetch();
  };

  const handleViewCampaigns = (brandId: string) => {
    if (onBrandSelect) {
      onBrandSelect(brandId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Brands</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Brand</DialogTitle>
              <DialogDescription>
                Create a new brand to manage your campaigns
              </DialogDescription>
            </DialogHeader>
            <AddBrandForm onSuccess={handleAddSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {!brands?.length ? (
        <EmptyBrandState onAddSuccess={handleAddSuccess} />
      ) : (
        <div className="grid gap-4">
          {brands?.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onEdit={setEditingBrand}
              onEditSuccess={handleEditSuccess}
              onViewCampaigns={handleViewCampaigns}
              isEditing={editingBrand?.id === brand.id}
              onEditingChange={(isEditing) => !isEditing && setEditingBrand(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
};