import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RouteHandler = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && profile) {
      console.log("Profile loaded, redirecting based on account type:", profile.account_type);
      switch (profile.account_type) {
        case 'influencer':
          navigate('/dashboard/influencer');
          break;
        case 'brand':
          navigate('/dashboard/brand');
          break;
        case 'admin':
          navigate('/admin/settings');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [navigate, user, profile]);

  return null;
};