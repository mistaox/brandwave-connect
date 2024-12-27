import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityProps {
  brandId?: string;
}

export const RecentActivity = ({ brandId }: RecentActivityProps) => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["recent-activities", brandId],
    queryFn: async () => {
      if (!brandId) return [];

      // Fetch recent collaborations
      const { data: collaborations, error: collabError } = await supabase
        .from("collaborations")
        .select(`
          *,
          campaigns!inner(
            title,
            brand_id
          ),
          influencer:profiles(
            full_name
          )
        `)
        .eq("campaigns.brand_id", brandId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (collabError) throw collabError;

      // Fetch recent campaigns
      const { data: campaigns, error: campError } = await supabase
        .from("campaigns")
        .select("*")
        .eq("brand_id", brandId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (campError) throw campError;

      // Combine and sort activities
      const allActivities = [
        ...(collaborations?.map(collab => ({
          type: "collaboration",
          date: collab.created_at,
          title: `New collaboration request`,
          description: `${collab.influencer?.full_name} requested to join "${collab.campaigns.title}"`,
        })) || []),
        ...(campaigns?.map(campaign => ({
          type: "campaign",
          date: campaign.created_at,
          title: "New campaign created",
          description: campaign.title,
        })) || []),
      ].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, 5);

      return allActivities;
    },
    enabled: !!brandId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {activities?.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {activities?.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <CalendarDays className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};