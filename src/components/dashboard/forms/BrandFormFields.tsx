import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brand } from "@/types/brand";

interface BrandFormFieldsProps {
  defaultValues?: Partial<Brand>;
}

export const BrandFormFields = ({ defaultValues }: BrandFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Brand Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter brand name"
          defaultValue={defaultValues?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select name="industry" defaultValue={defaultValues?.industry || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="food">Food & Beverage</SelectItem>
            <SelectItem value="health">Health & Wellness</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="social_media">Social Media</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company_size">Company Size</Label>
        <Select name="company_size" defaultValue={defaultValues?.company_size || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="501+">501+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="Enter location"
          defaultValue={defaultValues?.location || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          placeholder="https://example.com"
          defaultValue={defaultValues?.website || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Brief description of your brand"
          defaultValue={defaultValues?.description || ""}
        />
      </div>
    </>
  );
};