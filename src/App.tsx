import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { useState, useCallback } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RouteHandler } from "@/components/auth/RouteHandler";
import { AuthStateHandler } from "@/components/auth/AuthStateHandler";
import Navbar from "@/components/layout/Navbar";

const AppContent = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  const handleAuthChange = useCallback(async (event: string, session: any) => {
    console.log("Auth state changed:", event, session);

    if (event === 'SIGNED_OUT') {
      console.log("User signed out, redirecting to login");
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Log the current auth state for debugging
  console.log("Current auth state:", { user, profile, loading });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
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
      </Routes>
    </>
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