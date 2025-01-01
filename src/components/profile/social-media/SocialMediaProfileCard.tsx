import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Edit, Trash2 } from "lucide-react";
import { EditSocialMediaProfileDialog } from "./EditSocialMediaProfileDialog";
import { SocialMediaProfile, SocialMediaPlatform } from "@/types/social-media";

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
} as const;

export const SocialMediaProfileCard = ({ profile }: { profile: SocialMediaProfile }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Icon = platformIcons[profile.platform as keyof typeof platformIcons] || Instagram;

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("social_media_profiles")
        .delete()
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Profile deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["social-media-profiles"] });
    } catch (error: any) {
      toast({
        title: "Error deleting profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            <div>
              <p className="font-medium">@{profile.username}</p>
              <p className="text-sm text-gray-500">{profile.follower_count.toLocaleString()} followers</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      <EditSocialMediaProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profile={profile}
      />
    </Card>
  );
};