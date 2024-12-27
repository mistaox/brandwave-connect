import { Star } from "lucide-react";

interface MarketplaceCardProps {
  name: string;
  image: string;
  category: string;
  followers: string;
  rating: number;
}

const MarketplaceCard = ({
  name,
  image,
  category,
  followers,
  rating,
}: MarketplaceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-brandgray mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{category}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-brandblue font-semibold">{followers}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;