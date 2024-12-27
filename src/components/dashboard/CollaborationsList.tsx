import { Loader2 } from "lucide-react";
import { useCollaborations } from "@/hooks/useCollaborations";
import { CollaborationItem } from "./CollaborationItem";
import { EmptyCollaborations } from "./EmptyCollaborations";

interface CollaborationsListProps {
  brandId?: string;
  influencerId?: string;
}

export const CollaborationsList = ({ brandId, influencerId }: CollaborationsListProps) => {
  const { data: collaborations, isLoading } = useCollaborations(brandId, influencerId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Active Collaborations</h2>
      
      {collaborations?.length === 0 ? (
        <EmptyCollaborations isInfluencer={!!influencerId} />
      ) : (
        <div className="grid gap-4">
          {collaborations?.map((collab) => (
            <CollaborationItem 
              key={collab.id} 
              collaboration={collab}
              showInfluencer={!influencerId}
            />
          ))}
        </div>
      )}
    </div>
  );
};