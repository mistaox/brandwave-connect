import { RouteProps } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorPage } from "@/components/error/ErrorPage";
import Index from "@/pages/Index";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import BrandListing from "@/pages/marketplace/BrandListing";
import InfluencerListing from "@/pages/marketplace/InfluencerListing";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import { DashboardRedirect } from "@/components/dashboard/DashboardRedirect";
import AdminSettings from "@/pages/admin/Settings";

// Public routes that don't require authentication
const publicPaths = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
];

// Protected routes that require authentication
const protectedPaths = [
  { 
    path: "/dashboard", 
    element: <ProtectedRoute><DashboardRedirect /></ProtectedRoute> 
  },
  { 
    path: "/dashboard/brand", 
    element: (
      <ProtectedRoute requiredAccountType="brand">
        <BrandDashboard />
      </ProtectedRoute>
    )
  },
  { 
    path: "/dashboard/influencer", 
    element: (
      <ProtectedRoute requiredAccountType="influencer">
        <InfluencerDashboard />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profile", 
    element: <ProtectedRoute><Profile /></ProtectedRoute> 
  },
  { 
    path: "/campaigns", 
    element: (
      <ProtectedRoute requiredAccountType="influencer">
        <BrandListing />
      </ProtectedRoute>
    )
  },
  { 
    path: "/messages", 
    element: <ProtectedRoute><Messages /></ProtectedRoute> 
  },
  { 
    path: "/admin/settings", 
    element: (
      <ProtectedRoute requiredAccountType="admin">
        <AdminSettings />
      </ProtectedRoute>
    )
  }
];

// Add error page route at the end to catch all unmatched routes
const errorRoute = { 
  path: "*", 
  element: <ErrorPage /> 
};

export const publicRoutes: RouteProps[] = [...publicPaths, ...protectedPaths, errorRoute];