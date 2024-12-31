import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useState, useCallback, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RouteHandler } from "@/components/auth/RouteHandler";
import { AuthStateHandler } from "@/components/auth/AuthStateHandler";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";

const AppContent = () => {
  const { user, profile, loading } = useAuth();

  const handleAuthChange = useCallback(async (event: string, session: any) => {
    console.log("Auth state changed:", event, session?.user?.id);

    if (event === 'SIGNED_OUT') {
      console.log("User signed out, redirecting to login");
      // Clear any stored auth data
      await supabase.auth.signOut();
      localStorage.removeItem('supabase.auth.token');
      window.location.href = '/login';
      return;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log("No session found during initialization");
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthStateHandler onAuthStateChange={handleAuthChange} />
      <RouteHandler />
      <Navbar />
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
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