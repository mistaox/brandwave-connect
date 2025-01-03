import { createBrowserRouter } from "react-router-dom";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { InfluencerActivity } from "@/components/dashboard/influencer/InfluencerActivity";
import { CollaborationDetails } from "@/components/collaborations/CollaborationDetails";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";

export const publicRoutes = [
  {
    path: "/",
    element: <BrandDashboard />,
  },
  {
    path: "/dashboard/brand",
    element: <BrandDashboard />,
  },
  {
    path: "/collaborations",
    element: <CollaborationsList />,
  },
  {
    path: "/influencer-activity",
    element: <InfluencerActivity />,
  },
  {
    path: "/collaborations/:id",
    element: <CollaborationDetails />,
  }
];

export const router = createBrowserRouter(publicRoutes);