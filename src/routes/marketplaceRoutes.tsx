import { RouteProps } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MarketplaceRedirect } from "@/components/marketplace/MarketplaceRedirect";
import BrandListing from "@/pages/marketplace/BrandListing";
import InfluencerListing from "@/pages/marketplace/InfluencerListing";

export const marketplaceRoutes: RouteProps[] = [
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
];