import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { MetricCard } from "./MetricCard";

interface DashboardMetricsProps {
  brandId?: string;
}

export const DashboardMetrics = ({ brandId }: DashboardMetricsProps) => {
  const { campaignsCount, collaborationsCount, totalBudget } = useDashboardMetrics(brandId);

  const metrics = [
    {
      title: "Total Campaigns",
      value: campaignsCount,
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
      value: collaborationsCount,
      description: "Active partnerships",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Total Budget",
      value: `$${totalBudget.toLocaleString()}`,
      description: "Allocated funds",
      icon: DollarSign,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};