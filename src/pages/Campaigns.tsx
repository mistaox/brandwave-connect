import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { CampaignsList } from "@/components/dashboard/CampaignsList";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

const Campaigns = () => {
  const { brandId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-6 pb-8">
        <Breadcrumbs />
        <CampaignsList brandId={brandId} />
      </main>
    </div>
  );
};

export default Campaigns;