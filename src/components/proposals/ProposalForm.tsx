import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProposalFormProps {
  collaborationId: string;
  onSubmit: () => void;
  initialData?: {
    proposal_text?: string;
    proposal_budget?: number;
    proposal_timeline?: string;
    proposal_deliverables?: string[];
  };
}

export const ProposalForm = ({ collaborationId, onSubmit, initialData }: ProposalFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deliverable, setDeliverable] = useState("");
  const [deliverables, setDeliverables] = useState<string[]>(initialData?.proposal_deliverables || []);

  const handleAddDeliverable = () => {
    if (deliverable.trim()) {
      setDeliverables([...deliverables, deliverable.trim()]);
      setDeliverable("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const proposalData = {
        proposal_text: formData.get("proposal_text"),
        proposal_budget: Number(formData.get("proposal_budget")),
        proposal_timeline: formData.get("proposal_timeline"),
        proposal_deliverables: deliverables,
        proposal_status: "submitted",
        proposal_submitted_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("collaborations")
        .update(proposalData)
        .eq("id", collaborationId);

      if (error) throw error;

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
            <div className="flex gap-2">
              <Input
                value={deliverable}
                onChange={(e) => setDeliverable(e.target.value)}
                placeholder="Add a deliverable"
              />
              <Button type="button" onClick={handleAddDeliverable}>
                Add
              </Button>
            </div>
            {deliverables.length > 0 && (
              <ul className="mt-2 space-y-2">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span>{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDeliverable(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
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