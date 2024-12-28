import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { DeliverablesList } from "./DeliverablesList";
import { submitProposal } from "./utils/proposalFormUtils";
import { ProposalTextInput } from "./form/ProposalTextInput";
import { ProposalBudgetInput } from "./form/ProposalBudgetInput";
import { ProposalTimelineInput } from "./form/ProposalTimelineInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
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
  const [savingDraft, setSavingDraft] = useState(false);
  const [formData, setFormData] = useState<Partial<ProposalFormData>>({
    proposal_text: initialData?.proposal_text || "",
    proposal_budget: initialData?.proposal_budget || 0,
    proposal_timeline: initialData?.proposal_timeline || "",
    proposal_deliverables: initialData?.proposal_deliverables || [],
  });
  const [deliverables, setDeliverables] = useState<string[]>(
    initialData?.proposal_deliverables || []
  );

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => clearInterval(timer);
  }, [formData]);

  const saveDraft = async () => {
    setSavingDraft(true);
    try {
      const { error } = await supabase
        .from("collaborations")
        .update({
          ...formData,
          proposal_status: "draft",
        })
        .eq("id", collaborationId);

      if (error) throw error;

      toast({
        title: "Draft saved",
        description: "Your proposal draft has been saved.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Error saving draft",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSavingDraft(false);
    }
  };

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

      // Save revision history
      await supabase.from("proposal_revisions").insert({
        collaboration_id: collaborationId,
        ...proposalData,
        revision_number: 1, // You might want to fetch the latest revision number and increment it
      });

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
          <ProposalTextInput 
            defaultValue={initialData?.proposal_text}
            onChange={(value) => setFormData(prev => ({ ...prev, proposal_text: value }))}
          />
          <ProposalBudgetInput 
            defaultValue={initialData?.proposal_budget}
            onChange={(value) => setFormData(prev => ({ ...prev, proposal_budget: value }))}
          />
          <ProposalTimelineInput 
            defaultValue={initialData?.proposal_timeline}
            onChange={(value) => setFormData(prev => ({ ...prev, proposal_timeline: value }))}
          />

          <div className="space-y-2">
            <DeliverablesList
              deliverables={deliverables}
              onAdd={(deliverable) => {
                setDeliverables([...deliverables, deliverable]);
                setFormData(prev => ({ ...prev, proposal_deliverables: [...deliverables, deliverable] }));
              }}
              onRemove={(index) => {
                const newDeliverables = deliverables.filter((_, i) => i !== index);
                setDeliverables(newDeliverables);
                setFormData(prev => ({ ...prev, proposal_deliverables: newDeliverables }));
              }}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={saveDraft}
              disabled={savingDraft}
            >
              {savingDraft ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Proposal"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Proposal</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit this proposal? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                  }}>
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};