import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Loader2 } from "lucide-react";

const EditCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          brand:brands(*)
        `)
        .eq("id", campaignId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      // Update campaign
      const { error: updateError } = await supabase
        .from("campaigns")
        .update({
          title: formData.get("title")?.toString(),
          description: formData.get("description")?.toString(),
          budget: formData.get("budget") ? Number(formData.get("budget")) : null,
          requirements: formData.get("requirements")?.toString(),
          start_date: formData.get("start_date")?.toString(),
          end_date: formData.get("end_date")?.toString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaignId);

      if (updateError) throw updateError;

      // Notify collaborating influencers
      const { data: collaborations } = await supabase
        .from("collaborations")
        .select("influencer_id")
        .eq("campaign_id", campaignId)
        .eq("status", "accepted");

      if (collaborations?.length) {
        const messages = collaborations.map((collab) => ({
          sender_id: campaign?.brand.owner_id,
          receiver_id: collab.influencer_id,
          content: `Campaign "${campaign?.title}" has been updated. Please check the latest changes.`,
        }));

        const { error: messageError } = await supabase
          .from("messages")
          .insert(messages);

        if (messageError) {
          console.error("Error sending notifications:", messageError);
        }
      }

      toast({
        title: "Campaign updated successfully",
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });

      navigate("/campaigns");
    } catch (error: any) {
      toast({
        title: "Error updating campaign",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Campaign</h1>
          <CampaignForm
            onSubmit={handleSubmit}
            loading={loading}
            defaultValues={{
              title: campaign?.title,
              description: campaign?.description,
              budget: campaign?.budget,
              requirements: campaign?.requirements,
              start_date: campaign?.start_date?.split('T')[0],
              end_date: campaign?.end_date?.split('T')[0],
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default EditCampaign;