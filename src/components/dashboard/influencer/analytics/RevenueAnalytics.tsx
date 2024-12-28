import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface RevenueAnalyticsProps {
  data: any[];
}

export const RevenueAnalytics = ({ data }: RevenueAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("7days");

  const processRevenueData = () => {
    const now = new Date();
    const daysToShow = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
    const startDate = new Date(now.setDate(now.getDate() - daysToShow));

    return data?.flatMap(collab => 
      collab.campaign_analytics?.filter((analytic: any) => 
        new Date(analytic.metrics_date) >= startDate
      ).map((analytic: any) => ({
        date: new Date(analytic.metrics_date).toLocaleDateString(),
        revenue: analytic.revenue || 0,
        projectedRevenue: (analytic.revenue || 0) * 1.2,
      }))
    ).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
  };

  const revenueData = processRevenueData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Analysis</CardTitle>
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
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Actual Revenue" />
              <Bar dataKey="projectedRevenue" fill="#82ca9d" name="Projected Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};