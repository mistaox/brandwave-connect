import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    budget: number;
    brand: {
      name: string;
      industry: string;
    };
  };
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApply = async () => {
    try {
      const { error } = await supabase
        .from("collaborations")
        .insert({
          campaign_id: campaign.id,
          influencer_id: user?.id,
          status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "Your application has been sent to the brand.",
      });
      
      // Navigate to the influencer dashboard
      navigate("/influencer/dashboard");
    } catch (error) {
      console.error("Error applying to campaign:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{campaign.title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          by {campaign.brand?.name} • {campaign.brand?.industry}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-lg">
            ${campaign.budget}
          </Badge>
          <Button onClick={handleApply}>Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};