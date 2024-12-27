import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, MapPin, Globe } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    full_name: string;
    username: string;
    avatar_url: string | null;
    account_type: string;
    location: string | null;
    website_url: string | null;
    brand_industry?: string;
    influencer_categories?: string[];
  };
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name} />
          <AvatarFallback>
            <UserRound className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            <p className="text-gray-600">@{profile.username}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="capitalize">
              {profile.account_type}
            </Badge>
            {profile.account_type === "brand" && profile.brand_industry && (
              <Badge variant="outline" className="capitalize">
                {profile.brand_industry}
              </Badge>
            )}
            {profile.account_type === "influencer" &&
              profile.influencer_categories?.map((category) => (
                <Badge key={category} variant="outline" className="capitalize">
                  {category}
                </Badge>
              ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website_url && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brandblue hover:underline"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};