import { Badge } from "@/components/ui/badge";

interface ProposalStatusProps {
  status: string | null;
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  if (!status) return <Badge variant="secondary">Not Submitted</Badge>;

  switch (status.toLowerCase()) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "submitted":
      return <Badge variant="primary">Under Review</Badge>;
    case "approved":
      return <Badge variant="success">Approved</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};