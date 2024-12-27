import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Total Campaigns",
      value: "0",
      description: "Active campaigns",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Reach",
      value: "0",
      description: "Potential audience",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Collaborations",
      value: "0",
      description: "Active partnerships",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Budget Spent",
      value: "$0",
      description: "Total investment",
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