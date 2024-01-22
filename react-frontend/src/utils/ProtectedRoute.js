import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};
