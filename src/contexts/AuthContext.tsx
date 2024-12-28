import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signOut: async () => {},
});

const isDevelopment = import.meta.env.DEV;

// Development user data - you can modify these IDs with actual user IDs from your database
const DEV_USERS = {
  brand: {
    id: "your-brand-user-id-here", // Replace with an actual user ID from your database
    email: "brand@example.com",
    user_metadata: {
      account_type: "brand"
    }
  },
  influencer: {
    id: "your-influencer-user-id-here", // Replace with an actual user ID from your database
    email: "influencer@example.com",
    user_metadata: {
      account_type: "influencer"
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDevelopment) {
      // In development, use the brand user by default
      const devUser = DEV_USERS.brand;
      setUser(devUser as User);
      getProfile(devUser.id);
    } else {
      // In production, use normal authentication
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  async function getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    if (isDevelopment) {
      // In development, just clear the user state
      setUser(null);
      setProfile(null);
    } else {
      try {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, signOut }}>
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