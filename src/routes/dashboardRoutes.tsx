import { RouteProps } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import BrandDashboard from "@/pages/dashboard/BrandDashboard";
import InfluencerDashboard from "@/pages/dashboard/InfluencerDashboard";
import { DashboardRedirect } from "@/components/dashboard/DashboardRedirect";
import CreateCampaign from "@/pages/campaigns/CreateCampaign";

export const dashboardRoutes: RouteProps[] = [
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
    path: "/dashboard/brand/campaigns/new", 
    element: (
      <ProtectedRoute requiredAccountType="brand">
        <CreateCampaign />
      </ProtectedRoute>
    )
  },
];