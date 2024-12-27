import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formatDistance } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ProposalDetailsProps {
  proposal: {
    id: string;
    proposal_text: string;
    proposal_budget: number;
    proposal_timeline: string;
    proposal_deliverables: string[];
    proposal_status: string;
    proposal_submitted_at: string;
  };
  isBrandOwner: boolean;
  onStatusUpdate?: () => void;
}

export const ProposalDetails = ({ 
  proposal, 
  isBrandOwner,
  onStatusUpdate 
}: ProposalDetailsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("collaborations")
        .update({ proposal_status: newStatus })
        .eq("id", proposal.id);

      if (error) throw error;

      toast({
        title: "Proposal status updated",
        description: `The proposal has been ${newStatus}.`,
      });

      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error("Error updating proposal status:", error);
      toast({
        title: "Error updating status",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "revision_requested":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Proposal Details</CardTitle>
            <CardDescription>
              Submitted {formatDistance(new Date(proposal.proposal_submitted_at), new Date(), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(proposal.proposal_status)}>
            {proposal.proposal_status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{proposal.proposal_text}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Budget</h4>
          <p className="text-sm text-muted-foreground">${proposal.proposal_budget}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Timeline</h4>
          <p className="text-sm text-muted-foreground">{proposal.proposal_timeline}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Deliverables</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {proposal.proposal_deliverables.map((deliverable, index) => (
              <li key={index}>{deliverable}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      {isBrandOwner && proposal.proposal_status === "submitted" && (
        <CardFooter className="flex gap-2">
          <Button
            onClick={() => handleStatusUpdate("accepted")}
            disabled={loading}
            className="flex-1"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accept"}
          </Button>
          <Button
            onClick={() => handleStatusUpdate("rejected")}
            variant="destructive"
            disabled={loading}
            className="flex-1"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
          </Button>
          <Button
            onClick={() => handleStatusUpdate("revision_requested")}
            variant="outline"
            disabled={loading}
            className="flex-1"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Revision"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};