import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitProposal } from "./utils/proposalFormUtils";
import { supabase } from "@/integrations/supabase/client";
import type { ProposalFormData } from "./utils/proposalFormUtils";
import { ProposalDetailsStep } from "./form/steps/ProposalDetailsStep";
import { DeliverablesStep } from "./form/steps/DeliverablesStep";
import { ProposalFormActions } from "./form/ProposalFormActions";

interface ProposalFormProps {
  collaborationId: string;
  onSubmit: () => void;
  initialData?: Partial<ProposalFormData>;
}

const STEPS = [
  {
    title: "Proposal Details",
    description: "Provide the basic details of your proposal",
  },
  {
    title: "Deliverables",
    description: "Define what you'll deliver for this campaign",
  },
];

export const ProposalForm = ({
  collaborationId,
  onSubmit,
  initialData,
}: ProposalFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [formData, setFormData] = useState<Partial<ProposalFormData>>({
    proposal_text: initialData?.proposal_text || "",
    proposal_budget: initialData?.proposal_budget || 0,
    proposal_timeline: initialData?.proposal_timeline || "",
    proposal_deliverables: initialData?.proposal_deliverables || [],
  });

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
      await submitProposal(collaborationId, formData as ProposalFormData);

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

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{STEPS[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 0 && (
            <ProposalDetailsStep
              defaultValues={formData}
              onChange={handleFieldChange}
            />
          )}

          {currentStep === 1 && (
            <DeliverablesStep
              deliverables={formData.proposal_deliverables || []}
              onAdd={(deliverable) => {
                const newDeliverables = [
                  ...(formData.proposal_deliverables || []),
                  deliverable,
                ];
                handleFieldChange("proposal_deliverables", newDeliverables);
              }}
              onRemove={(index) => {
                const newDeliverables = (formData.proposal_deliverables || []).filter(
                  (_, i) => i !== index
                );
                handleFieldChange("proposal_deliverables", newDeliverables);
              }}
            />
          )}

          <ProposalFormActions
            onSaveDraft={saveDraft}
            loading={loading}
            savingDraft={savingDraft}
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </form>
      </CardContent>
    </Card>
  );
};