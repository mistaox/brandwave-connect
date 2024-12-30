import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { ErrorPage } from "@/components/error/ErrorPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAccountType?: "brand" | "influencer" | "admin";
}

export const ProtectedRoute = ({ 
  children, 
  requiredAccountType 
}: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    if (!loading && requiredAccountType && profile?.account_type !== requiredAccountType) {
      console.log("Unauthorized access attempt:", {
        required: requiredAccountType,
        current: profile?.account_type
      });
    }
  }, [user, profile, requiredAccountType, navigate, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || (requiredAccountType && profile?.account_type !== requiredAccountType)) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};