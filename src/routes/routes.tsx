import { RouteProps } from "react-router-dom";
import { ErrorPage } from "@/components/error/ErrorPage";
import { publicRoutes } from "./publicRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { marketplaceRoutes } from "./marketplaceRoutes";
import { profileRoutes } from "./profileRoutes";

// Add error page route at the end to catch all unmatched routes
const errorRoute: RouteProps = { 
  path: "*", 
  element: <ErrorPage /> 
};

export const allRoutes: RouteProps[] = [
  ...publicRoutes,
  ...dashboardRoutes,
  ...marketplaceRoutes,
  ...profileRoutes,
  errorRoute
];

export { publicRoutes };