import { Badge } from "@/components/ui/badge";
import { getProposalStatusColor } from "@/utils/proposalStatus";

interface ProposalStatusProps {
  status: string | null;
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  if (!status) return null;

  const statusColor = getProposalStatusColor(status);
  
  return (
    <Badge className={statusColor}>
      {status.replace("_", " ")}
    </Badge>
  );
};