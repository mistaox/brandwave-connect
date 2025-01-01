import { Star } from "lucide-react";
import MarketplaceCard from "../ui/MarketplaceCard";

const FeaturedSection = () => {
  const featuredInfluencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      category: "Lifestyle & Fashion",
      followers: "500K+",
      rating: 4.9,
    },
    {
      id: 2,
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      category: "Tech & Gaming",
      followers: "750K+",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      category: "Health & Wellness",
      followers: "1M+",
      rating: 4.9,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brandgray mb-4">
            Featured Influencers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated influencers who are ready to take your brand to the next level
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredInfluencers.map((influencer) => (
            <MarketplaceCard key={influencer.id} {...influencer} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-brandblue text-white rounded-full hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
            View All Influencers
            <Star size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;