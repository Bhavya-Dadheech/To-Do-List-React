import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-provider/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  const exp_token = localStorage.getItem("exp_date");

  if (!exp_token) {
    // Handle case where expiration token is not set
    return <Navigate to="/login" />;
  }

  const token_exp = new Date(exp_token);

  if (!user.token || token_exp < new Date()) {
    // Handle case where user token is not set or token is expired
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;

export const AuthenticatedRoute = () => {
  const user = useAuth();
  const exp_token = localStorage.getItem("exp_date");
  const token_exp = new Date(exp_token);
  if (user.token && token_exp > new Date()) return <Navigate to="/dashboard" />;
  return <Outlet />;
};
