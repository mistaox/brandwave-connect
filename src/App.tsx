import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { supabase } from "./integrations/supabase/client";

const AppContent = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    // Log the current auth state for debugging
    console.log("Current auth state:", { user, profile });

    const handleAuthChange = async (event: string, session: any) => {
      console.log("Auth state changed:", event, session);

      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to login");
        navigate('/login');
        return;
      }

      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, waiting for profile");
        // Wait for profile to be loaded
        if (profile) {
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
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Initial route check
    if (user && profile) {
      console.log("Initial route check - user and profile present");
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
    } else if (!user) {
      console.log("No user present, checking if on protected route");
      const isProtectedRoute = window.location.pathname.includes('/dashboard') || 
                              window.location.pathname.includes('/admin');
      if (isProtectedRoute) {
        console.log("On protected route without auth, redirecting to login");
        navigate('/login');
      }
    }

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, user, profile]);

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};

const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;