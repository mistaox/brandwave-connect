import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BrandsList } from "@/components/dashboard/BrandsList";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandDashboard = () => {
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
        <DashboardHeader profile={profile} />
        <DashboardMetrics />
        
        <Tabs defaultValue="brands" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="brands" className="mt-6">
            <BrandsList />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <RecentActivity />
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-6">
            <DashboardMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BrandDashboard;