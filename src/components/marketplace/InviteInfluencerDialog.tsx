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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

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
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
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
    if (!selectedCampaign || !message.trim()) return;

    setLoading(true);
    try {
      // Create a collaboration
      const { error: collaborationError } = await supabase
        .from("collaborations")
        .insert({
          campaign_id: selectedCampaign,
          influencer_id: influencerId,
          status: "invited",
        });

      if (collaborationError) throw collaborationError;

      // Create a conversation if it doesn't exist
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
      });

      if (messageError) throw messageError;

      toast({
        title: "Invitation sent",
        description: `Successfully invited ${influencerName} to your campaign.`,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite to Campaign</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite {influencerName} to Campaign</DialogTitle>
          <DialogDescription>
            Select a campaign and send a message to invite this influencer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Campaign</label>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns?.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the influencer..."
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleInvite}
            disabled={loading || !selectedCampaign || !message.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Invitation...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};