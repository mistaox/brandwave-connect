import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { supabase } from "./integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AppContent = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // Log the current auth state for debugging
    console.log("Current auth state:", { user, profile, loading });

    const handleAuthChange = async (event: string, session: any) => {
      console.log("Auth state changed:", event, session);

      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to login");
        navigate('/login');
        return;
      }

      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, waiting for profile");
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
    }

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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