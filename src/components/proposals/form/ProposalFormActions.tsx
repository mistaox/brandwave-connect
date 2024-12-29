import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
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

interface ProposalFormActionsProps {
  onSaveDraft: () => Promise<void>;
  loading: boolean;
  savingDraft: boolean;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const ProposalFormActions = ({
  onSaveDraft,
  loading,
  savingDraft,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: ProposalFormActionsProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
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

      <div className="flex gap-2">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
        
        {!isLastStep ? (
          <Button type="button" onClick={onNext}>
            Next
          </Button>
        ) : (
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
                  Are you sure you want to submit this proposal? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const form = document.querySelector("form");
                    if (form) form.requestSubmit();
                  }}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};