import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  signOut: () => Promise<void>;
  impersonateRole: (role: 'brand' | 'influencer') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signOut: async () => {},
  impersonateRole: () => {},
});

const isDevelopment = import.meta.env.DEV;

// Development user data with real UUIDs from the database
const DEV_USERS = {
  brand: {
    id: "d63a9067-6971-4b56-9eaf-1bfb972167a6",
    email: "brand@example.com",
    aud: "authenticated",
    app_metadata: {},
    user_metadata: {
      account_type: "brand"
    },
    created_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString()
  } as User,
  influencer: {
    id: "e6f1a5df-6a23-4234-b0b3-0cf257accf92",
    email: "influencer@example.com",
    aud: "authenticated",
    app_metadata: {},
    user_metadata: {
      account_type: "influencer"
    },
    created_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString()
  } as User
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getProfile(userId: string) {
    try {
      console.log("Fetching profile for user:", userId);
      
      const { data: existingProfile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!existingProfile && isDevelopment) {
        const devUser = user?.user_metadata?.account_type === 'influencer' 
          ? DEV_USERS.influencer 
          : DEV_USERS.brand;

        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([{
            id: userId,
            account_type: devUser.user_metadata.account_type,
            full_name: devUser.user_metadata.account_type === 'brand' ? 'Demo Brand' : 'Demo Influencer',
            username: devUser.user_metadata.account_type === 'brand' ? 'demobrand' : 'demoinfluencer',
          }])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        console.log("Created new profile:", newProfile);
        setProfile(newProfile);
      } else {
        console.log("Found existing profile:", existingProfile);
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const impersonateRole = (role: 'brand' | 'influencer') => {
    if (!isDevelopment) return;
    const devUser = DEV_USERS[role];
    setUser(devUser);
    getProfile(devUser.id);
  };

  useEffect(() => {
    if (isDevelopment) {
      impersonateRole('influencer');
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log("Auth state changed:", _event, session);
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id);
        } else {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signOut = async () => {
    try {
      if (isDevelopment) {
        // In development, just clear the state
        setUser(null);
        setProfile(null);
      } else {
        // In production, sign out from Supabase and clear local storage
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Clear all local storage data
        localStorage.clear();
        
        // Reset state
        setUser(null);
        setProfile(null);
        
        // Clear any session cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        console.log("Successfully signed out and cleared all session data");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, signOut, impersonateRole }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};