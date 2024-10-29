import React from "react";
import { useGlobalContext } from "../GlobalProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
