import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Loader2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddBrandForm } from "./AddBrandForm";
import { EditBrandForm } from "./EditBrandForm";
import { useState } from "react";
import { Brand } from "@/types/brand";

interface BrandsListProps {
  onBrandSelect?: (brandId: string) => void;
}

export const BrandsList = ({ onBrandSelect }: BrandsListProps) => {
  const navigate = useNavigate();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const { data: brands, isLoading, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Brand[];
    },
  });

  const handleEditSuccess = () => {
    refetch();
    setEditingBrand(null);
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
            </DialogHeader>
            <AddBrandForm />
          </DialogContent>
        </Dialog>
      </div>

      {brands?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No brands yet</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add your first brand</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Brand</DialogTitle>
                </DialogHeader>
                <AddBrandForm />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {brands?.map((brand) => (
            <Card 
              key={brand.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onBrandSelect?.(brand.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{brand.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {brand.industry}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={editingBrand?.id === brand.id} onOpenChange={(open) => !open && setEditingBrand(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingBrand(brand);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Brand</DialogTitle>
                        </DialogHeader>
                        {editingBrand && (
                          <EditBrandForm
                            brand={editingBrand}
                            onSuccess={handleEditSuccess}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/brands/${brand.id}/campaigns`);
                      }}
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
          ))}
        </div>
      )}
    </div>
  );
};