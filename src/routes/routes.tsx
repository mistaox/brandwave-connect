import { RouteProps } from "react-router-dom";
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
import CreateCampaign from "@/pages/campaigns/CreateCampaign";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import Messages from "@/pages/Messages";

// Public routes configuration
export const publicRoutes: RouteProps[] = [
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
export const protectedRoutes: RouteProps[] = [
  // Brand-only routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedAccountTypes={["brand"]}>
        <BrandDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/campaigns/create",
    element: (
      <ProtectedRoute allowedAccountTypes={["brand"]}>
        <CreateCampaign />
      </ProtectedRoute>
    ),
  },
  {
    path: "/brands/:brandId/campaigns",
    element: (
      <ProtectedRoute allowedAccountTypes={["brand"]}>
        <Campaigns />
      </ProtectedRoute>
    ),
  },
  // Influencer-only routes
  {
    path: "/influencer/dashboard",
    element: (
      <ProtectedRoute allowedAccountTypes={["influencer"]}>
        <InfluencerDashboard />
      </ProtectedRoute>
    ),
  },
  // Shared protected routes
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
    path: "/messages",
    element: (
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    ),
  },
];
