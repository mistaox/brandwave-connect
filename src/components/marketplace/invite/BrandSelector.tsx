import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface BrandSelectorProps {
  value: string | null;
  onValueChange: (value: string) => void;
}

export const BrandSelector = ({ value, onValueChange }: BrandSelectorProps) => {
  const { user } = useAuth();

  const { data: brands, isLoading } = useQuery({
    queryKey: ["user-brands", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("brands")
        .select("id, name")
        .eq("owner_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!brands?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No brands available. Please create a brand first.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Select Brand</Label>
      <Select value={value || undefined} onValueChange={onValueChange}>
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