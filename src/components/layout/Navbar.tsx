import { Menu, X, UserCircle2, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavItems } from "./nav/NavItems";
import { AuthButtons } from "./nav/AuthButtons";
import { MobileNav } from "./nav/MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, impersonateRole } = useAuth();
  const isDevelopment = import.meta.env.DEV;
  const isAdmin = profile?.account_type === 'admin';

  const getNavItems = () => {
    if (!user) {
      return [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "FAQ", path: "/faq" },
        { name: "Contact", path: "/contact" },
      ];
    }

    const commonItems = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "FAQ", path: "/faq" },
      { name: "Contact", path: "/contact" },
      { name: "Dashboard", path: "/dashboard" },
    ];

    if (isAdmin) {
      return [
        ...commonItems,
        { name: "Settings", path: "/admin/settings" },
      ];
    }

    if (profile?.account_type === "brand") {
      return [
        ...commonItems,
        { name: "Marketplace", path: "/marketplace/influencers" },
        { name: "Campaigns", path: "/campaigns" },
      ];
    }

    return [
      ...commonItems,
      { name: "Marketplace", path: "/marketplace/brands" },
    ];
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-brandgray">
                Brand<span className="text-brandpink">Collab</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavItems items={navItems} isActive={isActive} />
              {isDevelopment && isAdmin && user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <UserCircle2 className="mr-2 h-4 w-4" />
                      {profile?.account_type || 'Select Role'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => impersonateRole('brand')}>
                      Brand
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => impersonateRole('influencer')}>
                      Influencer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <AuthButtons onSignOut={signOut} isAuthenticated={!!user} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brandgray hover:text-brandpink"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNav
            isOpen={isOpen}
            navItems={navItems}
            isActive={isActive}
            onSignOut={signOut}
            isAuthenticated={!!user}
            onClose={() => setIsOpen(false)}
            isDevelopment={isDevelopment}
            impersonateRole={impersonateRole}
            profile={profile}
            isAdmin={isAdmin}
          />
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden behind the navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;