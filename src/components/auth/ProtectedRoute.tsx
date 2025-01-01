import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAccountType?: "brand" | "influencer" | "admin";
}

export const ProtectedRoute = ({ 
  children, 
  requiredAccountType 
}: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || (requiredAccountType && profile?.account_type !== requiredAccountType)) {
    return null; // RouteHandler will handle the redirect
  }

  return <>{children}</>;
};