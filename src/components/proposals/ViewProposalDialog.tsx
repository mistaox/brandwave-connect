import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProposalStatus } from "./ProposalStatus";
import { formatDate } from "@/lib/utils";

interface ViewProposalDialogProps {
  proposal: {
    proposal_text: string | null;
    proposal_budget: number | null;
    proposal_timeline: string | null;
    proposal_deliverables: string[] | null;
    proposal_status: string | null;
    proposal_submitted_at: string | null;
  };
}

export const ViewProposalDialog = ({ proposal }: ViewProposalDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Proposal</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Proposal Details</DialogTitle>
          <DialogDescription>
            Submitted on {proposal.proposal_submitted_at ? formatDate(new Date(proposal.proposal_submitted_at)) : 'Not submitted'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <ProposalStatus status={proposal.proposal_status} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Proposal</h3>
            <p className="text-gray-700">{proposal.proposal_text}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Budget</h3>
            <Badge variant="secondary" className="text-lg">
              ${proposal.proposal_budget?.toLocaleString()}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Timeline</h3>
            <p className="text-gray-700">{proposal.proposal_timeline}</p>
          </div>

          {proposal.proposal_deliverables && proposal.proposal_deliverables.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Deliverables</h3>
              <ul className="list-disc pl-5 space-y-1">
                {proposal.proposal_deliverables.map((deliverable, index) => (
                  <li key={index} className="text-gray-700">
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};