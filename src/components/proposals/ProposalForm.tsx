import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { DeliverablesList } from "./DeliverablesList";
import { submitProposal } from "./utils/proposalFormUtils";
import type { ProposalFormData } from "./utils/proposalFormUtils";

interface ProposalFormProps {
  collaborationId: string;
  onSubmit: () => void;
  initialData?: Partial<ProposalFormData>;
}

export const ProposalForm = ({
  collaborationId,
  onSubmit,
  initialData,
}: ProposalFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deliverables, setDeliverables] = useState<string[]>(
    initialData?.proposal_deliverables || []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const proposalData: ProposalFormData = {
        proposal_text: formData.get("proposal_text")?.toString() || "",
        proposal_budget: Number(formData.get("proposal_budget")),
        proposal_timeline: formData.get("proposal_timeline")?.toString() || "",
        proposal_deliverables: deliverables,
      };

      await submitProposal(collaborationId, proposalData);

      toast({
        title: "Proposal submitted successfully",
        description: "The brand will be notified of your proposal.",
      });

      onSubmit();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast({
        title: "Error submitting proposal",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="proposal_text">Proposal Details</Label>
            <Textarea
              id="proposal_text"
              name="proposal_text"
              placeholder="Describe your proposal in detail..."
              defaultValue={initialData?.proposal_text}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposal_budget">Budget ($)</Label>
            <Input
              id="proposal_budget"
              name="proposal_budget"
              type="number"
              min="0"
              step="100"
              placeholder="Enter your proposed budget"
              defaultValue={initialData?.proposal_budget}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposal_timeline">Timeline</Label>
            <Input
              id="proposal_timeline"
              name="proposal_timeline"
              type="text"
              placeholder="e.g., '2 weeks' or 'March 1-15'"
              defaultValue={initialData?.proposal_timeline}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Deliverables</Label>
            <DeliverablesList
              deliverables={deliverables}
              onAdd={(deliverable) => setDeliverables([...deliverables, deliverable])}
              onRemove={(index) =>
                setDeliverables(deliverables.filter((_, i) => i !== index))
              }
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Proposal...
              </>
            ) : (
              "Submit Proposal"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};