import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardMetricsProps {
  brandId?: string;
}

export const DashboardMetrics = ({ brandId }: DashboardMetricsProps) => {
  const { data: campaignsCount } = useQuery({
    queryKey: ["campaigns-count", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { count, error } = await supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true })
        .eq("brand_id", brandId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!brandId,
  });

  const { data: collaborationsCount } = useQuery({
    queryKey: ["collaborations-count", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { count, error } = await supabase
        .from("collaborations")
        .select("campaigns!inner(*)", { count: "exact", head: true })
        .eq("campaigns.brand_id", brandId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!brandId,
  });

  const { data: totalBudget } = useQuery({
    queryKey: ["total-budget", brandId],
    queryFn: async () => {
      if (!brandId) return 0;
      const { data, error } = await supabase
        .from("campaigns")
        .select("budget")
        .eq("brand_id", brandId);
      
      if (error) throw error;
      return data.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
    },
    enabled: !!brandId,
  });

  const metrics = [
    {
      title: "Total Campaigns",
      value: campaignsCount?.toString() || "0",
      description: "Active campaigns",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Potential Reach",
      value: "0",
      description: "Combined audience",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Collaborations",
      value: collaborationsCount?.toString() || "0",
      description: "Active partnerships",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Total Budget",
      value: `$${totalBudget?.toLocaleString() || "0"}`,
      description: "Allocated funds",
      icon: DollarSign,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};