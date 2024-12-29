import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BasicInfoForm } from "./forms/BasicInfoForm";
import { AccountTypeForm } from "./forms/AccountTypeForm";
import { SocialMediaProfilesList } from "./social-media/SocialMediaProfilesList";

interface ProfileFormProps {
  profile: any;
  setProfile: (profile: any) => void;
}

export const ProfileForm = ({ profile, setProfile }: ProfileFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const updates = {
      full_name: String(formData.get("full_name")),
      username: String(formData.get("username")),
      bio: String(formData.get("bio")),
      website_url: String(formData.get("website_url")),
      location: String(formData.get("location")),
      ...(profile.account_type === "brand" && {
        brand_industry: String(formData.get("brand_industry")),
        brand_company_size: String(formData.get("brand_company_size")),
      }),
      ...(profile.account_type === "influencer" && {
        influencer_categories: String(formData.get("influencer_categories"))?.split(",").map(cat => cat.trim()),
        influencer_audience_size: Number(formData.get("influencer_audience_size")),
      }),
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;

      setProfile({ ...profile, ...updates });
      toast({
        title: "Profile updated successfully",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <BasicInfoForm profile={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountTypeForm profile={profile} />
        </CardContent>
      </Card>

      {profile.account_type === "influencer" && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaProfilesList userId={user?.id || ""} />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
};