import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface DashboardBreadcrumbsProps {
  brandName?: string;
}

export const DashboardBreadcrumbs = ({ brandName }: DashboardBreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <Link to="/dashboard" className="hover:text-gray-900">
        Dashboard
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">
        {brandName || "Brands"}
      </span>
    </nav>
  );
};