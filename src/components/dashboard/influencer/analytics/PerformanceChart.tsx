import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface PerformanceChartProps {
  data: any[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const [timeRange, setTimeRange] = useState("7days");
  
  const processData = () => {
    const now = new Date();
    const daysToShow = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
    const startDate = new Date(now.setDate(now.getDate() - daysToShow));

    return data?.flatMap(collab => 
      collab.campaign_analytics?.filter((analytic: any) => 
        new Date(analytic.metrics_date) >= startDate
      ).map((analytic: any) => ({
        date: new Date(analytic.metrics_date).toLocaleDateString(),
        views: analytic.views || 0,
        engagement: analytic.engagement_rate || 0,
        revenue: analytic.revenue || 0
      }))
    ).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
  };

  const chartData = processData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Campaign Performance</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
              <Line yAxisId="left" type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement %" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ffc658" name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};