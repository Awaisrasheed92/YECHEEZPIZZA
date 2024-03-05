
import React from "react";
import { Navigate } from "react-router-dom";

const Redirect = ({ children }) => {
  const user = localStorage.getItem("jwt");
  if (user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Redirect;
