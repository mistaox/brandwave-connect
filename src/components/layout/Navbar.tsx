import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
      { name: "Messages", path: "/messages" },
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
      { name: "Available Campaigns", path: "/marketplace/campaigns" },
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-gray-600 hover:text-brandblue transition-colors font-medium",
                    isActive(item.path) && "text-brandblue"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-brandblue"
                >
                  Sign Out
                </Button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-brandblue">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-brandblue text-white hover:bg-brandblue/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
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
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "block px-3 py-2 rounded-md text-gray-600 hover:text-brandblue hover:bg-gray-50",
                      isActive(item.path) && "text-brandblue bg-gray-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-brandblue"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-gray-600 hover:text-brandblue"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-brandblue hover:text-brandblue/90"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden behind the navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;