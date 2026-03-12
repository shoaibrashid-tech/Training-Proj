import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./authContext";
import Loading from "../components/Loading";
import AccessDenied from "../pages/AccessDenied";

export default function ProtectedRoute({ adminCheck = false, children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // 2. Get the current location

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><Loading /></div>;
  }

  if (!user) {
    // 3. Pass the current location to the login route via state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && adminCheck && (user.role !== "admin")) {
    return <AccessDenied />;
  }

  return children;
}