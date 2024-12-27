import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, Bell } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      icon: MessageSquare,
      color: "text-blue-500",
      title: "Welcome to BrandCollab!",
      description: "Complete your profile to get started.",
      time: "Just now",
    },
    {
      icon: Calendar,
      color: "text-green-500",
      title: "Ready to create your first campaign?",
      description: "Click here to start collaborating with influencers.",
      time: "Just now",
    },
    {
      icon: Bell,
      color: "text-orange-500",
      title: "Discover influencers",
      description: "Browse our marketplace to find the perfect match.",
      time: "Just now",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`rounded-full p-2 bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};