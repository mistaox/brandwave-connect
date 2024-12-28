import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProposalBudgetInputProps {
  defaultValue?: number;
}

export const ProposalBudgetInput = ({ defaultValue }: ProposalBudgetInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="proposal_budget">Budget ($)</Label>
      <Input
        id="proposal_budget"
        name="proposal_budget"
        type="number"
        min="0"
        step="100"
        placeholder="Enter your proposed budget"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};