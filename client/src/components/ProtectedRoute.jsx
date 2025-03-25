import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
