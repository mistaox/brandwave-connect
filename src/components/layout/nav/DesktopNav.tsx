import { NavItems } from "./NavItems";
import { RoleSelector } from "./RoleSelector";
import { AuthButtons } from "./AuthButtons";

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
      <AuthButtons onSignOut={signOut} isAuthenticated={!!user} />
    </div>
  );
};