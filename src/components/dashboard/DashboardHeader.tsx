import { Building2, Users, Globe, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  profile: {
    full_name?: string;
    brand_industry?: string;
    brand_company_size?: string;
    location?: string;
  } | null;
}

export const DashboardHeader = ({ profile }: DashboardHeaderProps) => {
  if (!profile) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">{profile.full_name || 'Demo User'}</h1>
              <Link to="/profile">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="capitalize">
                {profile.brand_industry || 'Technology'}
              </Badge>
              {profile.location && (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {profile.location}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Company Size</p>
                <p className="text-sm text-gray-500">{profile.brand_company_size || 'Small'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Influencers</p>
                <p className="text-sm text-gray-500">0 Connected</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};