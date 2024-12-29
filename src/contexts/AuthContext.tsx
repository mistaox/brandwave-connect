import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  impersonateRole: (role: 'brand' | 'influencer') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
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
  const [loading, setLoading] = useState(false);

  async function getProfile(userId: string) {
    try {
      console.log("Fetching profile for user:", userId);
      
      const { data: existingProfile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      if (!existingProfile && isDevelopment) {
        console.log("Creating demo profile for development...");
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
          console.error("Error creating demo profile:", insertError);
          return null;
        }

        console.log("Created new profile:", newProfile);
        return newProfile;
      }

      console.log("Found existing profile:", existingProfile);
      return existingProfile;
    } catch (error) {
      console.error("Error in getProfile:", error);
      return null;
    }
  }

  const impersonateRole = (role: 'brand' | 'influencer') => {
    if (!isDevelopment) return;
    const devUser = DEV_USERS[role];
    setUser(devUser);
    getProfile(devUser.id).then(profile => {
      if (profile) setProfile(profile);
    }).catch(console.error);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        console.log("Initializing auth...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session:", session);
        
        if (session?.user) {
          setUser(session.user);
          const profile = await getProfile(session.user.id);
          if (profile) setProfile(profile);
        } else {
          // Explicitly set user and profile to null when no session exists
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // On error, ensure user is logged out
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      setLoading(true);
      try {
        if (session?.user) {
          setUser(session.user);
          const profile = await getProfile(session.user.id);
          if (profile) setProfile(profile);
        } else {
          // Explicitly set user and profile to null when session ends
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        // On error, ensure user is logged out
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      if (isDevelopment) {
        setUser(null);
        setProfile(null);
      } else {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        localStorage.clear();
        setUser(null);
        setProfile(null);
        
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        console.log("Successfully signed out and cleared all session data");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, impersonateRole }}>
      {children}
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