import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: any[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = data?.flatMap(collab => 
    collab.campaign_analytics?.map((analytic: any) => ({
      date: new Date(analytic.metrics_date).toLocaleDateString(),
      views: analytic.views,
      engagement: analytic.engagement_rate,
      revenue: analytic.revenue
    }))
  ) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8884d8" />
              <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
              <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};