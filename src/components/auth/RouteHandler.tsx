import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const RouteHandler = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) return;

    // Public routes that should always be accessible
    const publicRoutes = ['/', '/about', '/faq', '/contact'];
    if (publicRoutes.includes(location.pathname)) {
      return; // Allow access to public routes regardless of auth state
    }

    // Don't redirect if we're already on auth routes
    if (['/login', '/register', '/forgot-password'].includes(location.pathname)) {
      if (user && profile) {
        console.log("User already authenticated, redirecting to dashboard");
        navigate('/dashboard');
      }
      return;
    }

    // Handle unauthenticated users trying to access protected routes
    if (!user) {
      console.log("No authenticated user, redirecting to login");
      navigate('/login', { replace: true });
      return;
    }

    // Only show profile error if we're not loading and there's no profile after 2 seconds
    const profileTimeout = setTimeout(() => {
      if (!loading && user && !profile) {
        console.log("No profile found after timeout");
        toast({
          title: "Profile Error",
          description: "Unable to load your profile. Please try logging in again.",
          variant: "destructive",
        });
        navigate('/login', { replace: true });
      }
    }, 2000);

    // Only redirect on dashboard routes that need account type routing
    if (location.pathname === "/dashboard" && profile) {
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

    return () => clearTimeout(profileTimeout);
  }, [navigate, user, profile, location.pathname, loading, toast]);

  return null;
};