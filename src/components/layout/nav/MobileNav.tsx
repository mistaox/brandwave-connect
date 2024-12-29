import { NavItems } from "./NavItems";
import { AuthButtons } from "./AuthButtons";
import { RoleSelector } from "./RoleSelector";

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
            <RoleSelector 
              profile={profile} 
              impersonateRole={impersonateRole}
              onClose={onClose}
            />
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