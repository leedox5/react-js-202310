import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (isLogin) {
    return <Outlet />;
  }
  return <Navigate replace to="/" />;
};

export default PrivateRoute;
