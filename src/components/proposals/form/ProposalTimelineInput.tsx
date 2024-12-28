import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProposalTimelineInputProps {
  defaultValue?: string;
}

export const ProposalTimelineInput = ({ defaultValue }: ProposalTimelineInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="proposal_timeline">Timeline</Label>
      <Input
        id="proposal_timeline"
        name="proposal_timeline"
        type="text"
        placeholder="e.g., '2 weeks' or 'March 1-15'"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};