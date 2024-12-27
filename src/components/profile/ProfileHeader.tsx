import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    full_name: string;
    username: string;
    avatar_url: string | null;
    account_type: string;
    location: string | null;
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
        <div>
          <h1 className="text-2xl font-bold">{profile.full_name}</h1>
          <p className="text-gray-600">@{profile.username}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {profile.account_type}
            </span>
            {profile.location && (
              <span className="text-gray-500 text-sm">{profile.location}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};