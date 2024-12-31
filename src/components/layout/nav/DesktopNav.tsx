import { NavItems } from "./NavItems";
import { AuthButtons } from "./AuthButtons";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface DesktopNavProps {
  navItems: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  user: any;
  profile: any;
  signOut: () => void;
}

export const DesktopNav = ({
  navItems,
  isActive,
  user,
  profile,
  signOut,
}: DesktopNavProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavItems items={navItems} isActive={isActive} />
      {user ? (
        <div className="flex items-center gap-3">
          {profile?.account_type && (
            <Badge variant="outline" className="capitalize">
              {profile.account_type}
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <UserCircle2 className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.full_name || "My Account"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email || user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <AuthButtons onSignOut={signOut} isAuthenticated={!!user} />
      )}
    </div>
  );
};