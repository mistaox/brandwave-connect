import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { InfluencerHeader } from "@/components/dashboard/influencer/InfluencerHeader";
import { SocialMediaProfilesList } from "@/components/profile/social-media/SocialMediaProfilesList";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioGrid } from "@/components/dashboard/influencer/portfolio/PortfolioGrid";

const InfluencerProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .eq("account_type", "influencer")
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Influencer not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <InfluencerHeader profile={profile} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
              <PortfolioGrid influencer_id={profile.id} />
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                <SocialMediaProfilesList userId={profile.id} viewOnly />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfluencerProfile;