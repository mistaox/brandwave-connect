import { supabase } from "@/integrations/supabase/client";

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    console.log("Successfully signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const impersonateRole = (role: 'brand' | 'influencer') => {
  console.log("Impersonation is only available in development mode");
};