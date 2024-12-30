import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BrandDashboardTabs } from "@/components/dashboard/brand/BrandDashboardTabs";
import { LoadingSpinner } from "@/components/dashboard/brand/LoadingSpinner";
import { DashboardBreadcrumbs } from "@/components/navigation/DashboardBreadcrumbs";
import { useBrandProfile } from "@/hooks/useBrandProfile";

const BrandDashboard = () => {
  const { profile, loading, selectedBrandId, setSelectedBrandId } = useBrandProfile();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <DashboardBreadcrumbs />
        <DashboardHeader profile={profile} />
        <BrandDashboardTabs 
          selectedBrandId={selectedBrandId} 
          onBrandSelect={setSelectedBrandId} 
        />
      </main>
    </div>
  );
};

export default BrandDashboard;