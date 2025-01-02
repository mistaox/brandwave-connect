import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Award, Facebook, Instagram, Youtube } from "lucide-react";
import { formatFollowerCount } from "@/lib/utils";

interface InfluencerProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencer: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
    location: string | null;
    influencer_categories: string[];
    influencer_audience_size: number;
    social_links?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export const InfluencerProfileModal = ({
  open,
  onOpenChange,
  influencer,
}: InfluencerProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Hero Banner */}
        <div className="relative h-48 bg-gradient-to-r from-brandblue to-blue-600">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold">Influencer Profile</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Profile Image and Basic Info */}
            <div className="w-full md:w-1/3">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={influencer.avatar_url || ""} alt={influencer.full_name} />
                <AvatarFallback>{influencer.full_name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-semibold text-center mt-4">{influencer.full_name}</h3>
              
              {influencer.location && (
                <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{influencer.location}</span>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-4">
                {influencer.social_links?.facebook && (
                  <a href={influencer.social_links.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                  </a>
                )}
                {influencer.social_links?.instagram && (
                  <a href={influencer.social_links.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600" />
                  </a>
                )}
                {influencer.social_links?.youtube && (
                  <a href={influencer.social_links.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-5 h-5 text-gray-600 hover:text-red-600" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="w-full md:w-2/3">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Followers</h4>
                  <div className="flex gap-4">
                    {influencer.social_links?.facebook && (
                      <div className="flex items-center gap-2">
                        <Facebook className="w-4 h-4" />
                        <span>{formatFollowerCount(influencer.influencer_audience_size)}</span>
                      </div>
                    )}
                    {influencer.social_links?.instagram && (
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        <span>{formatFollowerCount(influencer.influencer_audience_size)}</span>
                      </div>
                    )}
                    {influencer.social_links?.youtube && (
                      <div className="flex items-center gap-2">
                        <Youtube className="w-4 h-4" />
                        <span>{formatFollowerCount(influencer.influencer_audience_size)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {influencer.influencer_categories?.map((category) => (
                      <Badge key={category} variant="secondary" className="capitalize">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Bio</h4>
                  <p className="text-gray-600">{influencer.bio || "No bio available"}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Experience</h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>Completed 5 Campaigns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};