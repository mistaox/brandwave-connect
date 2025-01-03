import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { RouteHandler } from "@/components/auth/RouteHandler";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AppContent = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RouteHandler />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/dashboard/brand" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5000,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;