import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, RouteProps } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { publicRoutes, protectedRoutes } from "./routes/routes";

const queryClient = new QueryClient();

const App = () => {
  // Convert RouteObject to RouteProps
  const renderRoute = (route: RouteProps) => (
    <Route 
      key={route.path || 'index'} 
      path={route.path}
      element={route.element}
    />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              {publicRoutes.map(renderRoute)}
              {/* Protected routes */}
              {protectedRoutes.map(renderRoute)}
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;