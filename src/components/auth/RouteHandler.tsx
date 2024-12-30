import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const RouteHandler = () => {
  // Temporarily disable route protection
  return null;

  // Original code commented out for later restoration
  /*
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) return;

    // Public routes that should always be accessible
    const publicRoutes = ['/', '/about', '/faq', '/contact'];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    if (['/login', '/register', '/forgot-password'].includes(location.pathname)) {
      if (user && profile) {
        console.log("User already authenticated, redirecting to dashboard");
        navigate('/dashboard');
      }
      return;
    }

    if (!user) {
      console.log("No authenticated user, redirecting to login");
      navigate('/login', { replace: true });
      return;
    }

    if (user && !profile) {
      console.log("No profile found for authenticated user");
      toast({
        title: "Profile Error",
        description: "Unable to load your profile. Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    if (location.pathname === "/dashboard") {
      console.log("Redirecting based on account type:", profile?.account_type);
      switch (profile?.account_type) {
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
          console.error("Unknown account type:", profile?.account_type);
          toast({
            title: "Account Type Error",
            description: "Invalid account type. Please contact support.",
            variant: "destructive",
          });
      }
    }
  }, [navigate, user, profile, location.pathname, loading, toast]);
  */

  return null;
};