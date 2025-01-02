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
        const { data: conversations, error } = await supabase
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
            )
          `)
          .or(`participant1_id.eq.${user?.id},participant2_id.eq.${user?.id}`)
          .order("last_message_at", { ascending: false });

        if (error) throw error;

        // For now, we'll group conversations by date instead of campaigns
        const grouped = conversations?.reduce((acc: GroupedConversation[], conv) => {
          const today = new Date().toDateString();
          const messageDate = new Date(conv.last_message_at || conv.created_at).toDateString();
          
          const groupTitle = messageDate === today ? "Today" : messageDate;
          
          let group = acc.find(g => g.brandName === groupTitle);
          if (!group) {
            group = {
              brandId: groupTitle,
              brandName: groupTitle,
              campaigns: [{
                campaignId: 'default',
                campaignTitle: 'Messages',
                conversations: []
              }]
            };
            acc.push(group);
          }
          
          group.campaigns[0].conversations.push({
            ...conv,
            collaborations: []
          });
          
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
            {groupedConversations.map((group) => (
              <AccordionItem key={group.brandId} value={group.brandId}>
                <AccordionTrigger className="text-lg font-semibold">
                  {group.brandName}
                </AccordionTrigger>
                <AccordionContent>
                  {group.campaigns.map((campaign) => (
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