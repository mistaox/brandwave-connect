import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useState, useCallback } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RouteHandler } from "@/components/auth/RouteHandler";
import { AuthStateHandler } from "@/components/auth/AuthStateHandler";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const EmergencySignOut = () => {
  const handleEmergencySignOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Emergency sign out successful");
      window.location.href = '/login';
    } catch (error) {
      console.error("Emergency sign out failed:", error);
    }
  };

  return (
    <Button 
      onClick={handleEmergencySignOut}
      className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600"
    >
      Emergency Sign Out
    </Button>
  );
};

const AppContent = () => {
  const { user, profile, loading } = useAuth();

  const handleAuthChange = useCallback(async (event: string, session: any) => {
    console.log("Auth state changed:", event, session?.user?.id);

    if (event === 'SIGNED_OUT') {
      console.log("User signed out, redirecting to login");
      window.location.href = '/login';
      return;
    }
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
      <EmergencySignOut />
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