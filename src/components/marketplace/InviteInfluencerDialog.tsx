import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InviteInfluencerDialogProps {
  influencerId: string;
  influencerName: string;
}

export const InviteInfluencerDialog = ({
  influencerId,
  influencerName,
}: InviteInfluencerDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["brand-campaigns", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*, brands!inner(*)")
        .eq("brands.owner_id", user?.id)
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleInvite = async () => {
    if (selectedCampaigns.length === 0 || !message.trim()) return;

    setLoading(true);
    try {
      // Create collaborations for each selected campaign
      for (const campaignId of selectedCampaigns) {
        // Create a collaboration
        const { error: collaborationError } = await supabase
          .from("collaborations")
          .insert({
            campaign_id: campaignId,
            influencer_id: influencerId,
            status: "invited",
          });

        if (collaborationError) throw collaborationError;
      }

      // Create or get conversation
      const { data: existingConversation } = await supabase
        .from("conversations")
        .select("id")
        .or(`participant1_id.eq.${user?.id},participant2_id.eq.${user?.id}`)
        .or(`participant1_id.eq.${influencerId},participant2_id.eq.${influencerId}`)
        .single();

      let conversationId = existingConversation?.id;

      if (!conversationId) {
        const { data: newConversation, error: conversationError } = await supabase
          .from("conversations")
          .insert({
            participant1_id: user?.id,
            participant2_id: influencerId,
          })
          .select()
          .single();

        if (conversationError) throw conversationError;
        conversationId = newConversation.id;
      }

      // Send the message
      const { error: messageError } = await supabase.from("messages").insert({
        sender_id: user?.id,
        receiver_id: influencerId,
        content: message,
        conversation_id: conversationId,
      });

      if (messageError) throw messageError;

      toast({
        title: "Invitations sent",
        description: `Successfully invited ${influencerName} to ${selectedCampaigns.length} campaign(s).`,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error sending invitations:", error);
      toast({
        title: "Error",
        description: "Failed to send invitations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaign = (campaignId: string) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite to Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite {influencerName} to Campaigns</DialogTitle>
          <DialogDescription>
            Select campaigns and send a message to invite this influencer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Select Campaigns</Label>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={campaign.id}
                        checked={selectedCampaigns.includes(campaign.id)}
                        onCheckedChange={() => toggleCampaign(campaign.id)}
                      />
                      <Label
                        htmlFor={campaign.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {campaign.title}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground">No active campaigns available.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the influencer..."
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleInvite}
            disabled={loading || selectedCampaigns.length === 0 || !message.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Invitations...
              </>
            ) : (
              "Send Invitations"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};