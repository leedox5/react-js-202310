import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  const refreshToken = localStorage.getItem("refresh");

  if (refreshToken) {
    return <Navigate to="/mypage" />;
  }

  return <Outlet />;
};

export default HomeLayout;
