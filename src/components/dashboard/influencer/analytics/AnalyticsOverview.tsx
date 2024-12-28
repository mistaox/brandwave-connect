import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceChart } from "./PerformanceChart";
import { EngagementMetrics } from "./EngagementMetrics";
import { AudienceInsights } from "./AudienceInsights";
import { Loader2 } from "lucide-react";

export const AnalyticsOverview = () => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['campaign-analytics'],
    queryFn: async () => {
      const { data: collaborations, error: collabError } = await supabase
        .from('collaborations')
        .select(`
          id,
          campaign_id,
          metrics,
          performance_data,
          campaign_analytics (*)
        `)
        .eq('influencer_id', (await supabase.auth.getUser()).data.user?.id);

      if (collabError) throw collabError;
      return collaborations;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <PerformanceChart data={analyticsData} />
          </TabsContent>

          <TabsContent value="engagement">
            <EngagementMetrics data={analyticsData} />
          </TabsContent>

          <TabsContent value="audience">
            <AudienceInsights data={analyticsData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};