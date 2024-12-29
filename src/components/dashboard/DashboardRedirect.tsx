import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const DashboardRedirect = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      if (profile.account_type === "admin") {
        navigate("/admin/settings");
      } else if (profile.account_type === "brand") {
        navigate("/dashboard/brand");
      } else if (profile.account_type === "influencer") {
        navigate("/dashboard/influencer");
      }
    }
  }, [profile, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};