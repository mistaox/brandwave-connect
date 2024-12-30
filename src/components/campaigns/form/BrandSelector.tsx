import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Brand {
  id: string;
  name: string;
}

interface BrandSelectorProps {
  defaultValue?: string;
}

export const BrandSelector = ({ defaultValue }: BrandSelectorProps) => {
  const { user } = useAuth();

  const { data: brands, isLoading } = useQuery({
    queryKey: ["userBrands", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("brands")
        .select("id, name")
        .eq("owner_id", user.id);

      if (error) {
        console.error("Error fetching brands:", error);
        throw error;
      }

      return data as Brand[];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!brands?.length) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">
          You need to create a brand before creating a campaign
        </p>
        <Button asChild>
          <a href="/dashboard">Create a Brand</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="brand_id">Select Brand</Label>
      <Select name="brand_id" defaultValue={defaultValue} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};