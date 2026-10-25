
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking login status...</p>;
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
