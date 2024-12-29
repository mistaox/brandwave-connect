import { RouteProps } from "react-router-dom";
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
import Campaigns from "@/pages/Campaigns";
import CreateCampaign from "@/pages/campaigns/CreateCampaign";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import { DashboardRedirect } from "@/components/dashboard/DashboardRedirect";
import AdminSettings from "@/pages/admin/Settings";

export const publicRoutes: RouteProps[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/dashboard", element: <DashboardRedirect /> },
  { path: "/dashboard/brand", element: <BrandDashboard /> },
  { path: "/dashboard/influencer", element: <InfluencerDashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/marketplace", element: <MarketplaceRedirect /> },
  { path: "/marketplace/brands", element: <BrandListing /> },
  { path: "/marketplace/influencers", element: <InfluencerListing /> },
  { path: "/campaigns", element: <Campaigns /> },
  { path: "/campaigns/create", element: <CreateCampaign /> },
  { path: "/campaigns/:campaignId/edit", element: <EditCampaign /> },
  { path: "/messages", element: <Messages /> },
  { path: "/admin/settings", element: <AdminSettings /> },
];