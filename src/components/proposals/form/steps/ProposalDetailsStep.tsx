import { ProposalTextInput } from "../ProposalTextInput";
import { ProposalBudgetInput } from "../ProposalBudgetInput";
import { ProposalTimelineInput } from "../ProposalTimelineInput";

interface ProposalDetailsStepProps {
  defaultValues?: {
    proposal_text?: string;
    proposal_budget?: number;
    proposal_timeline?: string;
  };
  onChange: (field: string, value: string | number) => void;
}

export const ProposalDetailsStep = ({
  defaultValues,
  onChange,
}: ProposalDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <ProposalTextInput
        defaultValue={defaultValues?.proposal_text}
        onChange={(value) => onChange("proposal_text", value)}
      />
      <ProposalBudgetInput
        defaultValue={defaultValues?.proposal_budget}
        onChange={(value) => onChange("proposal_budget", value)}
      />
      <ProposalTimelineInput
        defaultValue={defaultValues?.proposal_timeline}
        onChange={(value) => onChange("proposal_timeline", value)}
      />
    </div>
  );
};