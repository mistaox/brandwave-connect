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
import { MessagingInterface } from "@/components/messaging/MessagingInterface";
import { ConversationsList } from "@/components/messaging/ConversationsList";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const BrandDashboard = () => {
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user?.id) {
          setProfile(authProfile);
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);

        // Get the first brand for initial load
        const { data: brands, error: brandsError } = await supabase
          .from("brands")
          .select("id")
          .eq("owner_id", user.id)
          .limit(1)
          .maybeSingle();

        if (brandsError) {
          console.error("Error loading brands:", brandsError);
        } else if (brands) {
          setSelectedBrandId(brands.id);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error loading profile",
          description: "Using demo profile instead",
          variant: "destructive",
        });
        setProfile(authProfile);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, authProfile, toast]);

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
          <TabsList className="grid w-full grid-cols-5 lg:w-[750px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
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

          <TabsContent value="messages" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow">
                <ConversationsList
                  selectedConversation={selectedConversation}
                  onSelectConversation={setSelectedConversation}
                />
              </div>
              <div className="md:col-span-2 bg-white rounded-lg shadow">
                <MessagingInterface conversationId={selectedConversation} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BrandDashboard;