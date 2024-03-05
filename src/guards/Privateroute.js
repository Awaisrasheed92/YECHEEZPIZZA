import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("jwt");
  if (!user) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoutes;