import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CollaborationsListProps {
  brandId: string;
}

export const CollaborationsList = ({ brandId }: CollaborationsListProps) => {
  const navigate = useNavigate();

  const { data: collaborations, isLoading } = useQuery({
    queryKey: ["collaborations", brandId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaborations")
        .select(`
          *,
          campaigns:campaigns(*),
          influencer:profiles(*)
        `)
        .eq("campaigns.brand_id", brandId);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Active Collaborations</h2>
      
      {collaborations?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-4">No active collaborations</p>
            <Button onClick={() => navigate("/marketplace/influencers")}>
              Find Influencers
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {collaborations?.map((collab) => (
            <Card key={collab.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {collab.influencer.full_name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Campaign: {collab.campaigns.title}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/collaborations/${collab.id}`)}
                  >
                    View Details
                  </Button>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="capitalize">{collab.status}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Proposal:</span>{" "}
                    {collab.proposal_text ? "Submitted" : "Pending"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};