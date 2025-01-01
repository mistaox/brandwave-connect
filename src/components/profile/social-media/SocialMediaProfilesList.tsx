import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SocialMediaProfileCard } from "./SocialMediaProfileCard";
import { AddSocialMediaProfileDialog } from "./AddSocialMediaProfileDialog";

interface SocialMediaProfilesListProps {
  userId: string;
  viewOnly?: boolean;
}

export const SocialMediaProfilesList = ({ userId, viewOnly = false }: SocialMediaProfilesListProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["social-media-profiles", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_media_profiles")
        .select("*")
        .eq("influencer_id", userId)
        .order("platform");

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {!viewOnly && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Profile
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {profiles?.map((profile) => (
          <SocialMediaProfileCard
            key={profile.id}
            profile={profile}
            viewOnly={viewOnly}
          />
        ))}
        {profiles?.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No social media profiles added yet.
          </p>
        )}
      </div>

      {!viewOnly && (
        <AddSocialMediaProfileDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          userId={userId}
        />
      )}
    </div>
  );
};