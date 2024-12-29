import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RouteHandler = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if we're already on a valid route
    if (location.pathname !== "/" && location.pathname !== "/login") {
      return;
    }

    if (user && profile) {
      console.log("Profile loaded, redirecting based on account type:", profile.account_type);
      switch (profile.account_type) {
        case 'influencer':
          navigate('/dashboard/influencer', { replace: true });
          break;
        case 'brand':
          navigate('/dashboard/brand', { replace: true });
          break;
        case 'admin':
          navigate('/admin/settings', { replace: true });
          break;
        default:
          navigate('/dashboard', { replace: true });
      }
    }
  }, [navigate, user, profile, location.pathname]);

  return null;
};