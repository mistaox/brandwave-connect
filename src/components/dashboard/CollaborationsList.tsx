import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useCollaborations } from "@/hooks/useCollaborations";
import { CollaborationItem } from "./CollaborationItem";
import { EmptyCollaborations } from "./EmptyCollaborations";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface CollaborationsListProps {
  brandId?: string;
  influencerId?: string;
}

export const CollaborationsList = ({ brandId, influencerId }: CollaborationsListProps) => {
  const queryClient = useQueryClient();
  const { data: collaborations, isLoading } = useCollaborations(brandId, influencerId);

  useEffect(() => {
    // Subscribe to collaboration changes
    const channel = supabase
      .channel('collaborations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'collaborations',
          filter: brandId 
            ? `campaigns.brand_id=eq.${brandId}` 
            : influencerId 
            ? `influencer_id=eq.${influencerId}`
            : undefined
        },
        () => {
          // Invalidate and refetch collaborations
          queryClient.invalidateQueries({
            queryKey: ['collaborations', brandId, influencerId]
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [brandId, influencerId, queryClient]);

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
      
      {!collaborations?.length ? (
        <EmptyCollaborations isInfluencer={!!influencerId} />
      ) : (
        <div className="grid gap-4">
          {collaborations?.map((collab) => (
            <CollaborationItem 
              key={collab.id} 
              collaboration={{
                ...collab,
                campaigns: {
                  ...collab.campaigns,
                  brand: {
                    name: collab.campaigns?.brand?.name || '',
                    owner_id: collab.campaigns?.brand?.owner_id || ''
                  }
                }
              }}
              showInfluencer={!influencerId}
            />
          ))}
        </div>
      )}
    </div>
  );
};