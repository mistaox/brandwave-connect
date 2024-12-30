import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface CampaignFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
  brands?: Brand[];
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

export const CampaignForm = ({ onSubmit, loading, brands, defaultValues }: CampaignFormProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
    } catch (error: any) {
      console.error("Campaign creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {brands && brands.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="brand_id">Select Brand</Label>
          <Select name="brand_id" defaultValue={defaultValues?.brand_id}>
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
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Campaign Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter campaign title"
          defaultValue={defaultValues?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your campaign"
          defaultValue={defaultValues?.description}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget ($)</Label>
        <Input
          id="budget"
          name="budget"
          type="number"
          min="0"
          step="100"
          placeholder="Enter campaign budget"
          defaultValue={defaultValues?.budget}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          placeholder="List your campaign requirements"
          defaultValue={defaultValues?.requirements}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={defaultValues?.start_date}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={defaultValues?.end_date}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Campaign...
          </>
        ) : (
          "Create Campaign"
        )}
      </Button>
    </form>
  );
};