import { RouteProps } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import AdminSettings from "@/pages/admin/Settings";

export const profileRoutes: RouteProps[] = [
  { 
    path: "/profile", 
    element: <ProtectedRoute><Profile /></ProtectedRoute> 
  },
  { 
    path: "/messages", 
    element: <ProtectedRoute><Messages /></ProtectedRoute> 
  },
  { 
    path: "/admin/settings", 
    element: (
      <ProtectedRoute requiredAccountType="admin">
        <AdminSettings />
      </ProtectedRoute>
    )
  },
];