export type SocialMediaPlatform = "facebook" | "linkedin" | "twitter" | "instagram" | "youtube";

export interface SocialMediaProfile {
  id: string;
  influencer_id: string;
  platform: SocialMediaPlatform;
  username: string;
  profile_url: string;
  follower_count: number;
  created_at?: string;
  updated_at?: string;
}