import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Image as ImageIcon, Video, Link, ChartBar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  media_url: string;
  media_type: string;
  platform: string;
  engagement_metrics: any;
  created_at: string;
  influencer_id: string;
  updated_at: string;
}

interface PortfolioGridProps {
  items?: PortfolioItem[];
  influencer_id?: string; // Changed from influencerId to match Supabase column name
}

export const PortfolioGrid = ({ items, influencer_id }: PortfolioGridProps) => {
  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ['portfolio-items', influencer_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('influencer_id', influencer_id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !items && !!influencer_id, // Only fetch if items prop is not provided and influencer_id exists
  });

  const displayItems = items || portfolioItems;

  if (isLoading && !items) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!displayItems?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No portfolio items yet. Add your first work showcase!
      </div>
    );
  }

  const getIcon = (mediaType: string | null) => {
    switch (mediaType) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'link':
        return <Link className="h-4 w-4" />;
      default:
        return <ChartBar className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayItems.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {getIcon(item.media_type)}
          </CardHeader>
          <CardContent>
            {item.media_url && (
              <div className="aspect-video mb-4">
                {item.media_type === 'image' ? (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : item.media_type === 'video' ? (
                  <video
                    src={item.media_url}
                    controls
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : null}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.platform && (
              <p className="text-xs text-muted-foreground mt-2">
                Platform: {item.platform}
              </p>
            )}
            {item.engagement_metrics && (
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Engagement: {JSON.stringify(item.engagement_metrics)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};