import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavItems } from "./nav/NavItems";
import { AuthButtons } from "./nav/AuthButtons";
import { MobileNav } from "./nav/MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

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
          />
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden behind the navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;