import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedAccountTypes?: string[];
}

export const ProtectedRoute = ({ 
  children, 
  allowedAccountTypes 
}: ProtectedRouteProps) => {
  const { user, loading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (
        allowedAccountTypes && 
        profile && 
        !allowedAccountTypes.includes(profile.account_type)
      ) {
        // Redirect to appropriate dashboard if user tries to access unauthorized route
        if (profile.account_type === 'brand') {
          navigate("/dashboard");
        } else if (profile.account_type === 'influencer') {
          navigate("/influencer/dashboard");
        }
      }
    }
  }, [user, loading, navigate, allowedAccountTypes, profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return user ? <>{children}</> : null;
};