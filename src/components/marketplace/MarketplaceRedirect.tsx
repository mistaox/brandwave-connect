import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const MarketplaceRedirect = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      if (profile.account_type === "brand") {
        navigate("/marketplace/influencers");
      } else if (profile.account_type === "influencer") {
        navigate("/marketplace/campaigns");
      }
    }
  }, [profile, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};