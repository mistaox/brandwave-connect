import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProposalStatus } from "./ProposalStatus";
import { Loader2 } from "lucide-react";

interface ManageProposalDialogProps {
  collaborationId: string;
  currentStatus: string | null;
  onStatusUpdate: () => void;
}

export const ManageProposalDialog = ({
  collaborationId,
  currentStatus,
  onStatusUpdate,
}: ManageProposalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleUpdateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("collaborations")
        .update({
          proposal_status: newStatus,
          status: newStatus === "approved" ? "active" : "pending",
        })
        .eq("id", collaborationId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Proposal has been ${newStatus}`,
      });

      onStatusUpdate();
      setOpen(false);
    } catch (error) {
      console.error("Error updating proposal status:", error);
      toast({
        title: "Error",
        description: "Failed to update proposal status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Manage Proposal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Proposal</DialogTitle>
          <DialogDescription>
            Current status: <ProposalStatus status={currentStatus} />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Feedback (optional)</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback about the proposal..."
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => handleUpdateStatus("rejected")}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                "Reject"
              )}
            </Button>
            <Button
              onClick={() => handleUpdateStatus("approved")}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                "Approve"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};