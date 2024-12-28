import { createContext, useContext, ReactNode } from "react";

// Define the shape of our auth context
interface AuthContextType {
  user: { id: string } | null;
  profile: {
    id: string;
    account_type?: string;
    full_name?: string;
  } | null;
  signOut: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: { id: "demo-user-id" },
  profile: {
    id: "demo-user-id",
    account_type: "brand",
    full_name: "Demo User"
  },
  signOut: () => {},
});

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  // For now, we'll just provide a mock user and profile
  const mockUser = { id: "demo-user-id" };
  const mockProfile = {
    id: "demo-user-id",
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

// Create the hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};