import { Database } from "@/integrations/supabase/types";

export type Conversation = Database["public"]["Tables"]["conversations"]["Row"] & {
  participant1: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  participant2: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  messages: {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
  }[];
  collaborations: {
    campaign_id: string;
    campaigns: {
      id: string;
      title: string;
      brand_id: string;
      brands: {
        id: string;
        name: string;
      };
    };
  }[];
};

export interface GroupedConversation {
  brandId: string;
  brandName: string;
  campaigns: {
    campaignId: string;
    campaignTitle: string;
    conversations: Conversation[];
  }[];
}