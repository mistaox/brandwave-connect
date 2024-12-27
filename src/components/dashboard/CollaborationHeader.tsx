import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CollaborationHeaderProps {
  title: string;
  subtitle: string;
  collaborationId: string;
}

export const CollaborationHeader = ({ 
  title, 
  subtitle, 
  collaborationId 
}: CollaborationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      </div>
      <Button
        variant="outline"
        onClick={() => navigate(`/collaborations/${collaborationId}`)}
      >
        View Details
      </Button>
    </div>
  );
};