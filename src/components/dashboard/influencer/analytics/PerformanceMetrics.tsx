import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const PerformanceMetrics = () => {
  const { user } = useAuth();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['performance-metrics', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_analytics')
        .select(`
          *,
          collaboration:collaborations(
            campaign:campaigns(title)
          )
        `)
        .order('metrics_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics?.map((metric) => (
            <div key={metric.id} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Campaign</p>
                <p className="font-medium">{metric.collaboration?.campaign?.title || 'Untitled'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Views</p>
                <p className="font-medium">{metric.views?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <p className="font-medium">{metric.engagement_rate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversions</p>
                <p className="font-medium">{metric.conversions?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};