import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { UserRole } from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Role-based auto-redirect for wrong routes
  if (user) {
    if (user.role === "district_officer" && location.pathname === "/dashboard") {
      return <Navigate to="/dashboard/district" replace />;
    }
    if (user.role === "state_officer" && location.pathname === "/dashboard") {
      return <Navigate to={`/dashboard/states/${user.state}`} replace />;
    }
    if (user.role === "building_authority" && location.pathname === "/dashboard") {
      return <Navigate to="/dashboard/officer" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
