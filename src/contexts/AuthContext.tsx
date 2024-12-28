import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: { id: string } | null;
  profile: {
    id: string;
    account_type?: string;
    full_name?: string;
  } | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: { id: "00000000-0000-0000-0000-000000000000" },
  profile: {
    id: "00000000-0000-0000-0000-000000000000",
    account_type: "brand",
    full_name: "Demo User"
  },
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const mockUser = { id: "00000000-0000-0000-0000-000000000000" };
  const mockProfile = {
    id: "00000000-0000-0000-0000-000000000000",
    account_type: "brand",
    full_name: "Demo User"
  };

  const signOut = () => {
    console.log("Sign out clicked - no actual authentication in place");
  };

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        profile: mockProfile,
        signOut,
      }}
    >
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