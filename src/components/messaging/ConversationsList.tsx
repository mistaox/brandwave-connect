import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CampaignGroup } from "./CampaignGroup";
import { GroupedConversation } from "@/types/conversation";

interface ConversationsListProps {
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const ConversationsList = ({
  selectedConversation,
  onSelectConversation,
}: ConversationsListProps) => {
  const { user } = useAuth();
  const [groupedConversations, setGroupedConversations] = useState<GroupedConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await supabase
          .from("conversations")
          .select(`
            *,
            participant1:profiles!conversations_participant1_id_fkey(id, full_name, avatar_url),
            participant2:profiles!conversations_participant2_id_fkey(id, full_name, avatar_url),
            messages(
              id,
              content,
              created_at,
              sender_id
            ),
            collaborations!inner(
              campaign_id,
              campaigns(
                id,
                title,
                brand_id,
                brands(
                  id,
                  name
                )
              )
            )
          `)
          .or(`participant1_id.eq.${user?.id},participant2_id.eq.${user?.id}`)
          .order("last_message_at", { ascending: false });

        if (error) throw error;

        // Group conversations by brand and campaign
        const grouped = data?.reduce((acc: GroupedConversation[], conv) => {
          const collaboration = conv.collaborations[0];
          const campaign = collaboration?.campaigns;
          const brand = campaign?.brands;

          if (!brand || !campaign) return acc;

          let brandGroup = acc.find(g => g.brandId === brand.id);
          if (!brandGroup) {
            brandGroup = {
              brandId: brand.id,
              brandName: brand.name,
              campaigns: []
            };
            acc.push(brandGroup);
          }

          let campaignGroup = brandGroup.campaigns.find(c => c.campaignId === campaign.id);
          if (!campaignGroup) {
            campaignGroup = {
              campaignId: campaign.id,
              campaignTitle: campaign.title,
              conversations: []
            };
            brandGroup.campaigns.push(campaignGroup);
          }

          campaignGroup.conversations.push(conv);
          return acc;
        }, []);

        setGroupedConversations(grouped || []);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast({
          title: "Error loading conversations",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to conversation updates
    const channel = supabase
      .channel("conversations-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `participant1_id=eq.${user?.id}`,
        },
        () => fetchConversations()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `participant2_id=eq.${user?.id}`,
        },
        () => fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-full">
        <div className="p-4">
          <Accordion type="single" collapsible className="space-y-4">
            {groupedConversations.map((brandGroup) => (
              <AccordionItem key={brandGroup.brandId} value={brandGroup.brandId}>
                <AccordionTrigger className="text-lg font-semibold">
                  {brandGroup.brandName}
                </AccordionTrigger>
                <AccordionContent>
                  {brandGroup.campaigns.map((campaign) => (
                    <CampaignGroup
                      key={campaign.campaignId}
                      campaignTitle={campaign.campaignTitle}
                      conversations={campaign.conversations}
                      selectedConversation={selectedConversation}
                      onSelectConversation={onSelectConversation}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};