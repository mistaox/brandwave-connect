import { NavItems } from "./NavItems";
import { AuthButtons } from "./AuthButtons";
import { RoleSelector } from "./RoleSelector";
import { UserCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  navItems: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  onSignOut: () => void;
  isAuthenticated: boolean;
  onClose: () => void;
  isDevelopment: boolean;
  impersonateRole: (role: 'brand' | 'influencer') => void;
  profile: any;
  isAdmin: boolean;
}

export const MobileNav = ({
  isOpen,
  navItems,
  isActive,
  onSignOut,
  isAuthenticated,
  onClose,
  isDevelopment,
  impersonateRole,
  profile,
  isAdmin,
}: MobileNavProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isAuthenticated && (
          <div className="flex items-center space-x-3 px-3 py-2 mb-2">
            <UserCircle2 className="h-8 w-8" />
            <div>
              <div className="font-medium">{profile?.full_name || "User"}</div>
              {profile?.account_type && (
                <Badge variant="outline" className="capitalize mb-2">
                  {profile.account_type}
                </Badge>
              )}
              <button
                onClick={handleProfileClick}
                className="text-sm text-gray-500 hover:text-gray-700 block mt-1 cursor-pointer"
              >
                Profile Settings
              </button>
            </div>
          </div>
        )}
        <NavItems items={navItems} isActive={isActive} onClose={onClose} />
        {isDevelopment && isAdmin && isAuthenticated && (
          <div className="py-2">
            <RoleSelector 
              profile={profile} 
              impersonateRole={impersonateRole}
              onClose={onClose}
            />
          </div>
        )}
        <div className="pt-2">
          <AuthButtons
            onSignOut={onSignOut}
            isAuthenticated={isAuthenticated}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};