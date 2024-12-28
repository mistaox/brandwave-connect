import { RouteProps } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import BrandListing from "@/pages/marketplace/BrandListing";
import InfluencerListing from "@/pages/marketplace/InfluencerListing";
import Campaigns from "@/pages/Campaigns";
import CreateCampaign from "@/pages/campaigns/CreateCampaign";
import EditCampaign from "@/pages/campaigns/EditCampaign";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";

// All routes are now public
export const publicRoutes: RouteProps[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/dashboard", element: <BrandDashboard /> },
  { path: "/influencer/dashboard", element: <InfluencerDashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/marketplace/brands", element: <BrandListing /> },
  { path: "/marketplace/influencers", element: <InfluencerListing /> },
  { path: "/campaigns", element: <Campaigns /> },
  { path: "/campaigns/create", element: <CreateCampaign /> },
  { path: "/campaigns/:campaignId/edit", element: <EditCampaign /> },
  { path: "/messages", element: <Messages /> },
];