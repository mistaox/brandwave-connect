import { NavItems } from "./NavItems";
import { AuthButtons } from "./AuthButtons";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavItems items={navItems} isActive={isActive} onClose={onClose} />
        {isDevelopment && isAdmin && isAuthenticated && (
          <div className="py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  {profile?.account_type || 'Select Role'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                  impersonateRole('brand');
                  onClose();
                }}>
                  Brand
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  impersonateRole('influencer');
                  onClose();
                }}>
                  Influencer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <AuthButtons
          onSignOut={onSignOut}
          isAuthenticated={isAuthenticated}
          onClose={onClose}
        />
      </div>
    </div>
  );
};