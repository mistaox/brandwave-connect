import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Users, Target, TrendingUp } from "lucide-react";

export const InfluencerMetrics = () => {
  const { user } = useAuth();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["influencer-metrics", user?.id],
    queryFn: async () => {
      const [collaborationsResponse, campaignsResponse] = await Promise.all([
        supabase
          .from("collaborations")
          .select("status")
          .eq("influencer_id", user?.id),
        supabase
          .from("campaigns")
          .select("id")
          .eq("status", "active")
      ]);

      const activeCollaborations = collaborationsResponse.data?.filter(
        (collab) => collab.status === "active"
      ).length || 0;

      const availableCampaigns = campaignsResponse.data?.length || 0;

      return {
        activeCollaborations,
        availableCampaigns,
        completedCampaigns: collaborationsResponse.data?.filter(
          (collab) => collab.status === "completed"
        ).length || 0,
      };
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Collaborations</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.activeCollaborations}</div>
          <p className="text-xs text-muted-foreground">
            Current ongoing partnerships
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Campaigns</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.availableCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            Open opportunities
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Campaigns</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.completedCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            Successfully finished
          </p>
        </CardContent>
      </Card>
    </div>
  );
};