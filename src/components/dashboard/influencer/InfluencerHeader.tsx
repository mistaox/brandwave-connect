import { Users, Star, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface InfluencerHeaderProps {
  profile: {
    full_name: string;
    influencer_categories?: string[];
    influencer_audience_size?: number;
    location?: string;
  };
}

export const InfluencerHeader = ({ profile }: InfluencerHeaderProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {profile.influencer_categories?.map((category) => (
                <Badge key={category} variant="secondary" className="capitalize">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Audience</p>
                <p className="text-sm text-gray-500">
                  {profile.influencer_audience_size?.toLocaleString() || 0} followers
                </p>
              </div>
            </div>
            {profile.location && (
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-500">{profile.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};