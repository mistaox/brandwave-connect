import { NavItems } from "./NavItems";
import { RoleSelector } from "./RoleSelector";
import { AuthButtons } from "./AuthButtons";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface DesktopNavProps {
  navItems: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  isDevelopment: boolean;
  isAdmin: boolean;
  user: any;
  profile: any;
  impersonateRole: (role: 'brand' | 'influencer') => void;
  signOut: () => void;
}

export const DesktopNav = ({
  navItems,
  isActive,
  isDevelopment,
  isAdmin,
  user,
  profile,
  impersonateRole,
  signOut,
}: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavItems items={navItems} isActive={isActive} />
      {isDevelopment && isAdmin && user && (
        <RoleSelector profile={profile} impersonateRole={impersonateRole} />
      )}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile?.full_name || "Profile"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircle2 className="h-6 w-6" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              {profile?.full_name || "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <AuthButtons onSignOut={signOut} isAuthenticated={!!user} />
      )}
    </div>
  );
};