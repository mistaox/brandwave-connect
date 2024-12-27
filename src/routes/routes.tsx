import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Profile from "@/pages/Profile";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import BrandListing from "@/pages/marketplace/BrandListing";
import InfluencerListing from "@/pages/marketplace/InfluencerListing";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Campaigns from "@/pages/Campaigns";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";

// Public routes configuration
export const publicRoutes: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/update-password", element: <UpdatePassword /> },
  { path: "/about", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/contact", element: <Contact /> },
];

// Protected routes configuration
export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <BrandDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/influencer/dashboard",
    element: (
      <ProtectedRoute>
        <InfluencerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/marketplace/brands",
    element: (
      <ProtectedRoute>
        <BrandListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/marketplace/influencers",
    element: (
      <ProtectedRoute>
        <InfluencerListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/campaigns",
    element: (
      <ProtectedRoute>
        <Campaigns />
      </ProtectedRoute>
    ),
  },
  {
    path: "/brands/:brandId/campaigns",
    element: (
      <ProtectedRoute>
        <Campaigns />
      </ProtectedRoute>
    ),
  },
];