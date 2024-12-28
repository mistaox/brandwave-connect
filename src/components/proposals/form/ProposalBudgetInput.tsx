import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProposalBudgetInputProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export const ProposalBudgetInput = ({ defaultValue, onChange }: ProposalBudgetInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="proposal_budget">Budget</Label>
      <Input
        id="proposal_budget"
        name="proposal_budget"
        type="number"
        placeholder="Enter your proposed budget"
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(Number(e.target.value))}
        required
      />
    </div>
  );
};