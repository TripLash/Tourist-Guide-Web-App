import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../Authentication/AuthContext";

const AdminProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  if (!authContext || !authContext.token) {
    return <Navigate to="/Login" />;
  }
  const { isAdmin } = authContext;

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;
