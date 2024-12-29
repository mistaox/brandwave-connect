import { RouteProps } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import { MarketplaceRedirect } from "@/components/marketplace/MarketplaceRedirect";
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
  { path: "/about", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/contact", element: <Contact /> },
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
    path: "/marketplace", 
    element: <ProtectedRoute><MarketplaceRedirect /></ProtectedRoute> 
  },
  { 
    path: "/marketplace/brands", 
    element: (
      <ProtectedRoute requiredAccountType="influencer">
        <BrandListing />
      </ProtectedRoute>
    )
  },
  { 
    path: "/marketplace/influencers", 
    element: (
      <ProtectedRoute requiredAccountType="brand">
        <InfluencerListing />
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
  },
];

export const publicRoutes: RouteProps[] = [...publicPaths, ...protectedPaths];