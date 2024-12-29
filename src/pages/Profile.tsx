import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }
        
        console.log("Fetching profile for user:", user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        if (!data) {
          console.log("No profile found, creating one...");
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert([
              { 
                id: user.id,
                account_type: user.user_metadata?.account_type || 'user',
                username: user.email?.split('@')[0] || 'user',
                full_name: user.user_metadata?.full_name || 'New User'
              }
            ])
            .select()
            .maybeSingle();

          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          console.log("Profile data:", data);
          setProfile(data);
        }
      } catch (error: any) {
        console.error("Profile fetch error:", error);
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-gray-500">Profile not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader profile={profile} />
        <ProfileForm profile={profile} setProfile={setProfile} />
      </main>
    </div>
  );
};

export default Profile;