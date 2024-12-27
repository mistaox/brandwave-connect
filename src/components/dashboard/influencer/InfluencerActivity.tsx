import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const InfluencerActivity = () => {
  const { user } = useAuth();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["influencer-activities", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaborations")
        .select(`
          *,
          campaign:campaigns(
            title,
            brand_id,
            brand:brands(name)
          )
        `)
        .eq("influencer_id", user?.id)
        .order("updated_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest collaborations and updates</CardDescription>
      </CardHeader>
      <CardContent>
        {activities && activities.length > 0 ? (
          <div className="space-y-8">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.campaign?.brand?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.campaign?.title}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    Status: {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity</p>
        )}
      </CardContent>
    </Card>
  );
};