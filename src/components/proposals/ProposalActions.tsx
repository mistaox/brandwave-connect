import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProposalActionsProps {
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  loading: boolean;
}

export const ProposalActions = ({ onApprove, onReject, loading }: ProposalActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={onReject}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Rejecting...
          </>
        ) : (
          "Reject"
        )}
      </Button>
      <Button
        onClick={onApprove}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Approving...
          </>
        ) : (
          "Approve"
        )}
      </Button>
    </div>
  );
};