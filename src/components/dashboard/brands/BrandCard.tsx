import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { EditBrandForm } from "../EditBrandForm";
import { Brand } from "@/types/brand";

interface BrandCardProps {
  brand: Brand;
  onEdit: (brand: Brand) => void;
  onEditSuccess: () => void;
  onViewCampaigns: (brandId: string) => void;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

export const BrandCard = ({
  brand,
  onEdit,
  onEditSuccess,
  onViewCampaigns,
  isEditing,
  onEditingChange,
}: BrandCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{brand.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {brand.industry}
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog 
              open={isEditing} 
              onOpenChange={(open) => !open && onEditingChange(false)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(brand);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Brand</DialogTitle>
                  <DialogDescription>
                    Update your brand information
                  </DialogDescription>
                </DialogHeader>
                <EditBrandForm
                  brand={brand}
                  onSuccess={onEditSuccess}
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => onViewCampaigns(brand.id)}
            >
              View Campaigns
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Size:</span>{" "}
            <span className="capitalize">{brand.company_size}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Location:</span>{" "}
            {brand.location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};