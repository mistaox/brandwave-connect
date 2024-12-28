import { NavItems } from "./NavItems";
import { AuthButtons } from "./AuthButtons";

interface MobileNavProps {
  isOpen: boolean;
  navItems: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  onSignOut: () => void;
  isAuthenticated: boolean;
  onClose: () => void;
}

export const MobileNav = ({
  isOpen,
  navItems,
  isActive,
  onSignOut,
  isAuthenticated,
  onClose,
}: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavItems items={navItems} isActive={isActive} onClose={onClose} />
        <AuthButtons
          onSignOut={onSignOut}
          isAuthenticated={isAuthenticated}
          onClose={onClose}
        />
      </div>
    </div>
  );
};