import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";
import { useAuthState } from "@/hooks/useAuthState";
import { signOut, impersonateRole } from "./auth/authActions";

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
  loading: true, // Changed default loading to true
  signOut: async () => {},
  impersonateRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuthState();

  // Log auth state for debugging
  console.log("AuthContext state:", { user, profile, loading });

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signOut, 
      impersonateRole 
    }}>
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