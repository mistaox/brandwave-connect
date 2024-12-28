import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Share2, MessageCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EngagementMetricsProps {
  data: any[];
}

export const EngagementMetrics = ({ data }: EngagementMetricsProps) => {
  const calculateMetrics = () => {
    const totalViews = data?.reduce((sum, collab) => 
      sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
        total + (analytic.views || 0), 0) || 0), 0);

    const averageEngagement = data?.reduce((sum, collab) => 
      sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
        total + (analytic.engagement_rate || 0), 0) || 0), 0) / (data?.length || 1);

    const totalClicks = data?.reduce((sum, collab) => 
      sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
        total + (analytic.clicks || 0), 0) || 0), 0);

    const conversionRate = (totalClicks / totalViews) * 100 || 0;

    return { totalViews, averageEngagement, totalClicks, conversionRate };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalViews.toLocaleString()}</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageEngagement.toFixed(2)}%</div>
            <Progress value={metrics.averageEngagement} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClicks.toLocaleString()}</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate.toFixed(2)}%</div>
            <Progress value={metrics.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};