import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProposalTextInputProps {
  defaultValue?: string;
}

export const ProposalTextInput = ({ defaultValue }: ProposalTextInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="proposal_text">Proposal Details</Label>
      <Textarea
        id="proposal_text"
        name="proposal_text"
        placeholder="Describe your proposal in detail..."
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};