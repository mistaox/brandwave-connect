import { User } from "@supabase/supabase-js";

// Development user state with complete User type properties
export const DEV_USER: User = {
  id: "d63a9067-6971-4b56-9eaf-1bfb972167a6",
  email: "dev@example.com",
  role: "authenticated",
  aud: "authenticated",
  app_metadata: {},
  user_metadata: {
    account_type: "brand"
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
} as const;

export const DEV_PROFILE = {
  id: DEV_USER.id,
  full_name: "Development User",
  account_type: "brand",
  username: "devuser",
};