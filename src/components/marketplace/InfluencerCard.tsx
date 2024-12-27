import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star } from "lucide-react";
import { InviteInfluencerDialog } from "./InviteInfluencerDialog";

interface InfluencerCardProps {
  influencer: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    influencer_categories: string[];
    influencer_audience_size: number;
    bio: string | null;
  };
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-24 h-24 mb-4 mx-auto">
          <Avatar className="w-full h-full">
            <AvatarImage src={influencer.avatar_url || ""} alt={influencer.full_name} />
            <AvatarFallback>{influencer.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-center">{influencer.full_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-brandblue" />
            <span>{formatFollowerCount(influencer.influencer_audience_size)}</span>
          </div>
        </div>
        <p className="text-gray-600 text-center mb-4">{influencer.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {influencer.influencer_categories?.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center">
          <InviteInfluencerDialog
            influencerId={influencer.id}
            influencerName={influencer.full_name}
          />
        </div>
      </CardContent>
    </Card>
  );
};