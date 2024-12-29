// Development user state
export const DEV_USER = {
  id: "d63a9067-6971-4b56-9eaf-1bfb972167a6", // Using existing UUID from database
  email: "dev@example.com",
  role: "authenticated",
  aud: "authenticated",
  user_metadata: {
    account_type: "brand"
  }
} as const;

export const DEV_PROFILE = {
  id: DEV_USER.id,
  full_name: "Development User",
  account_type: "brand",
  username: "devuser",
};