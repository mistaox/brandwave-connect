import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyCollaborationsProps {
  isInfluencer?: boolean;
}

export const EmptyCollaborations = ({ isInfluencer }: EmptyCollaborationsProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground mb-4">No active collaborations</p>
        <Button 
          onClick={() => navigate(isInfluencer ? "/marketplace/brands" : "/marketplace/influencers")}
        >
          {isInfluencer ? "Find Brands" : "Find Influencers"}
        </Button>
      </CardContent>
    </Card>
  );
};