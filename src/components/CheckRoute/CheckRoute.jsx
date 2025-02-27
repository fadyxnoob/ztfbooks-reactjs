import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.status); 

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default React.memo(CheckRoute);
