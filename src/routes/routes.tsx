import { lazy } from "react";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Blogs from "@/pages/Blogs";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import BrandListing from "@/pages/marketplace/BrandListing";
import InfluencerListing from "@/pages/marketplace/InfluencerListing";
import InfluencerProfile from "@/pages/InfluencerProfile";

export const publicRoutes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/dashboard/brand",
    element: <BrandDashboard />,
  },
  {
    path: "/dashboard/influencer",
    element: <InfluencerDashboard />,
  },
  {
    path: "/marketplace/brands",
    element: <BrandListing />,
  },
  {
    path: "/marketplace/influencers",
    element: <InfluencerListing />,
  },
  {
    path: "/influencer/:username",
    element: <InfluencerProfile />,
  },
];