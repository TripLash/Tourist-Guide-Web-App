import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.token) {
    return <Navigate to="/Login" />;
  }
  const { token } = authContext;

  return token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
