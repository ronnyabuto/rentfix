// src/router/RoleRoute.jsx
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function RoleRoute({ allow, children }) {
  const { currentUser, loading } = useAppContext();

  // While loading data, don't block routing
  if (loading) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  // If no user
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If role not allowed → send to home
  if (currentUser.role !== allow) {
    return <Navigate to="/" replace />;
  }

  // Allowed → render page
  return children;
}
