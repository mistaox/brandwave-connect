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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface AddSocialMediaProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const AddSocialMediaProfileDialog = ({
  open,
  onOpenChange,
  userId,
}: AddSocialMediaProfileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      influencer_id: userId,
      platform: formData.get("platform"),
      username: formData.get("username"),
      profile_url: formData.get("profile_url"),
      follower_count: Number(formData.get("follower_count")),
    };

    try {
      const { error } = await supabase
        .from("social_media_profiles")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Social media profile added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["social-media-profiles"] });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error adding profile",
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
          <DialogTitle>Add Social Media Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select name="platform" required>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile_url">Profile URL</Label>
            <Input
              id="profile_url"
              name="profile_url"
              placeholder="Enter your profile URL"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="follower_count">Follower Count</Label>
            <Input
              id="follower_count"
              name="follower_count"
              type="number"
              placeholder="Enter your follower count"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};