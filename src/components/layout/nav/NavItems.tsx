import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemsProps {
  items: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  onClose?: () => void;
}

export const NavItems = ({ items, isActive, onClose }: NavItemsProps) => {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "text-gray-600 hover:text-brandblue transition-colors font-medium",
            isActive(item.path) && "text-brandblue"
          )}
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};