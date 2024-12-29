import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemsProps {
  items: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  onClose?: () => void;
  className?: string;
}

export const NavItems = ({ items, isActive, onClose, className }: NavItemsProps) => {
  return (
    <div className={cn("flex md:items-center md:space-x-6 flex-col md:flex-row space-y-2 md:space-y-0", className)}>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "text-gray-600 hover:text-gray-900 transition-colors font-medium",
            isActive(item.path) && "text-gray-900"
          )}
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};