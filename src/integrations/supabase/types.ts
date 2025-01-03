export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          company_size: string | null
          created_at: string | null
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          name: string
          owner_id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          owner_id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          owner_id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brands_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          clicks: number | null
          collaboration_id: string | null
          conversions: number | null
          created_at: string | null
          engagement_rate: number | null
          id: string
          metrics_date: string
          revenue: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          clicks?: number | null
          collaboration_id?: string | null
          conversions?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          metrics_date: string
          revenue?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          clicks?: number | null
          collaboration_id?: string | null
          conversions?: number | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          metrics_date?: string
          revenue?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "collaborations"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_id: string
          budget: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          requirements: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_id: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          requirements?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          requirements?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_brand_ref_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborations: {
        Row: {
          campaign_id: string
          created_at: string | null
          id: string
          influencer_id: string
          metrics: Json | null
          performance_data: Json | null
          proposal_budget: number | null
          proposal_deliverables: string[] | null
          proposal_status: string | null
          proposal_submitted_at: string | null
          proposal_text: string | null
          proposal_timeline: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          id?: string
          influencer_id: string
          metrics?: Json | null
          performance_data?: Json | null
          proposal_budget?: number | null
          proposal_deliverables?: string[] | null
          proposal_status?: string | null
          proposal_submitted_at?: string | null
          proposal_text?: string | null
          proposal_timeline?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          id?: string
          influencer_id?: string
          metrics?: Json | null
          performance_data?: Json | null
          proposal_budget?: number | null
          proposal_deliverables?: string[] | null
          proposal_status?: string | null
          proposal_submitted_at?: string | null
          proposal_text?: string | null
          proposal_timeline?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaborations_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          last_message_at: string | null
          participant1_id: string
          participant2_id: string
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant1_id: string
          participant2_id: string
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant1_id?: string
          participant2_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      earnings: {
        Row: {
          amount: number
          collaboration_id: string | null
          created_at: string | null
          id: string
          influencer_id: string
          payment_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          collaboration_id?: string | null
          created_at?: string | null
          id?: string
          influencer_id: string
          payment_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          collaboration_id?: string | null
          created_at?: string | null
          id?: string
          influencer_id?: string
          payment_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "earnings_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "collaborations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earnings_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          created_at: string | null
          description: string | null
          engagement_metrics: Json | null
          id: string
          influencer_id: string
          media_type: string | null
          media_url: string | null
          platform: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          engagement_metrics?: Json | null
          id?: string
          influencer_id: string
          media_type?: string | null
          media_url?: string | null
          platform?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          engagement_metrics?: Json | null
          id?: string
          influencer_id?: string
          media_type?: string | null
          media_url?: string | null
          platform?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          avatar_url: string | null
          bio: string | null
          brand_company_size: string | null
          brand_industry: string | null
          created_at: string | null
          full_name: string | null
          id: string
          influencer_audience_size: number | null
          influencer_categories: string[] | null
          location: string | null
          social_links: Json | null
          updated_at: string | null
          username: string | null
          website_url: string | null
        }
        Insert: {
          account_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          brand_company_size?: string | null
          brand_industry?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          influencer_audience_size?: number | null
          influencer_categories?: string[] | null
          location?: string | null
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Update: {
          account_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          brand_company_size?: string | null
          brand_industry?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          influencer_audience_size?: number | null
          influencer_categories?: string[] | null
          location?: string | null
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      proposal_revisions: {
        Row: {
          collaboration_id: string
          created_at: string | null
          created_by: string | null
          id: string
          proposal_budget: number | null
          proposal_deliverables: string[] | null
          proposal_text: string | null
          proposal_timeline: string | null
          revision_number: number
        }
        Insert: {
          collaboration_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          proposal_budget?: number | null
          proposal_deliverables?: string[] | null
          proposal_text?: string | null
          proposal_timeline?: string | null
          revision_number: number
        }
        Update: {
          collaboration_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          proposal_budget?: number | null
          proposal_deliverables?: string[] | null
          proposal_text?: string | null
          proposal_timeline?: string | null
          revision_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposal_revisions_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "collaborations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_revisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media_profiles: {
        Row: {
          created_at: string | null
          follower_count: number
          id: string
          influencer_id: string
          platform: string
          profile_url: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          follower_count?: number
          id?: string
          influencer_id: string
          platform: string
          profile_url: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          follower_count?: number
          id?: string
          influencer_id?: string
          platform?: string
          profile_url?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_profiles_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
