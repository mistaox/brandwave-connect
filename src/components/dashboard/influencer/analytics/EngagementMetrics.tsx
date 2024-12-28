import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign } from "lucide-react";

interface EngagementMetricsProps {
  data: any[];
}

export const EngagementMetrics = ({ data }: EngagementMetricsProps) => {
  const totalViews = data?.reduce((sum, collab) => 
    sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
      total + (analytic.views || 0), 0) || 0), 0);

  const averageEngagement = data?.reduce((sum, collab) => 
    sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
      total + (analytic.engagement_rate || 0), 0) || 0), 0) / (data?.length || 1);

  const totalRevenue = data?.reduce((sum, collab) => 
    sum + (collab.campaign_analytics?.reduce((total: number, analytic: any) => 
      total + (analytic.revenue || 0), 0) || 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageEngagement.toFixed(2)}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
};