import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RouteHandler = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // Public routes that should always be accessible
    const publicRoutes = ['/', '/about', '/faq', '/contact'];
    if (publicRoutes.includes(location.pathname)) {
      return;
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
      }
    }
  }, [navigate, user, profile, location.pathname, loading]);

  return null;
};