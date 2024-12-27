import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AccountTypeForm = ({ profile }: { profile: any }) => {
  if (profile.account_type === "brand") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="brand_industry">Industry</Label>
          <Select name="brand_industry" defaultValue={profile?.brand_industry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_company_size">Company Size</Label>
          <Select name="brand_company_size" defaultValue={profile?.brand_company_size}>
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
      </div>
    );
  }

  if (profile.account_type === "influencer") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="influencer_categories">Categories</Label>
          <Input
            id="influencer_categories"
            name="influencer_categories"
            defaultValue={profile?.influencer_categories?.join(", ") || ""}
            placeholder="e.g., Fashion, Beauty, Tech (comma separated)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="influencer_audience_size">Audience Size</Label>
          <Input
            id="influencer_audience_size"
            name="influencer_audience_size"
            type="number"
            defaultValue={profile?.influencer_audience_size || ""}
            placeholder="Enter your follower count"
          />
        </div>
      </div>
    );
  }

  return null;
};