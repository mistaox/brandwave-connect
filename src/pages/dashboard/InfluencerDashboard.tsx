import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { InfluencerMetrics } from "@/components/dashboard/influencer/InfluencerMetrics";
import { InfluencerHeader } from "@/components/dashboard/influencer/InfluencerHeader";
import { InfluencerActivity } from "@/components/dashboard/influencer/InfluencerActivity";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { PortfolioList } from "@/components/dashboard/influencer/PortfolioList";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InfluencerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user?.id) return;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <InfluencerHeader profile={profile} />
        
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <InfluencerMetrics />
            <InfluencerActivity />
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-6">
            <PortfolioList />
          </TabsContent>
          
          <TabsContent value="collaborations" className="mt-6">
            <CollaborationsList influencerId={user?.id} />
          </TabsContent>

          <TabsContent value="earnings" className="mt-6">
            <div className="text-center text-gray-500 py-8">
              Earnings tracking coming soon
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default InfluencerDashboard;