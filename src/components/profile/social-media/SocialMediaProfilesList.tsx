import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import { AddSocialMediaProfileDialog } from "./AddSocialMediaProfileDialog";
import { SocialMediaProfileCard } from "./SocialMediaProfileCard";

export const SocialMediaProfilesList = ({ userId }: { userId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["social-media-profiles", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_media_profiles")
        .select("*")
        .eq("influencer_id", userId);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Social Media Profiles</h3>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles?.map((profile) => (
          <SocialMediaProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      <AddSocialMediaProfileDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        userId={userId}
      />
    </div>
  );
};