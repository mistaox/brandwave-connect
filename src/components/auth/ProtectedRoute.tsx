import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (requiredAccountType && profile?.account_type !== requiredAccountType) {
      navigate("/dashboard");
      return;
    }
  }, [user, profile, requiredAccountType, navigate]);

  if (!user || (requiredAccountType && profile?.account_type !== requiredAccountType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};