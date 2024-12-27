import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BrandsList } from "@/components/dashboard/BrandsList";
import { CampaignsList } from "@/components/dashboard/CampaignsList";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

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

        // Get the first brand for initial load
        const { data: brands } = await supabase
          .from("brands")
          .select("id")
          .eq("owner_id", user.id)
          .limit(1)
          .single();

        if (brands) {
          setSelectedBrandId(brands.id);
        }
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
        <DashboardHeader profile={profile} />
        
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <DashboardMetrics brandId={selectedBrandId || undefined} />
            <RecentActivity brandId={selectedBrandId || undefined} />
          </TabsContent>
          
          <TabsContent value="brands" className="mt-6">
            <BrandsList onBrandSelect={setSelectedBrandId} />
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-6">
            {selectedBrandId ? (
              <CampaignsList brandId={selectedBrandId} />
            ) : (
              <div className="text-center text-gray-500 py-8">
                Please select a brand to view campaigns
              </div>
            )}
          </TabsContent>

          <TabsContent value="collaborations" className="mt-6">
            {selectedBrandId ? (
              <CollaborationsList brandId={selectedBrandId} />
            ) : (
              <div className="text-center text-gray-500 py-8">
                Please select a brand to view collaborations
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BrandDashboard;