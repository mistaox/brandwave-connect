import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SocialMediaProfile } from "@/types/social-media";

interface EditSocialMediaProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: SocialMediaProfile;
}

export const EditSocialMediaProfileDialog = ({
  open,
  onOpenChange,
  profile,
}: EditSocialMediaProfileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      username: String(formData.get("username")),
      profile_url: String(formData.get("profile_url")),
      follower_count: Number(formData.get("follower_count")),
    };

    try {
      const { error } = await supabase
        .from("social_media_profiles")
        .update(data)
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Social media profile updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["social-media-profiles"] });
      onOpenChange(false);
    } catch (error: any) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {profile.platform} Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              defaultValue={profile.username}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile_url">Profile URL</Label>
            <Input
              id="profile_url"
              name="profile_url"
              defaultValue={profile.profile_url}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="follower_count">Follower Count</Label>
            <Input
              id="follower_count"
              name="follower_count"
              type="number"
              defaultValue={profile.follower_count}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};