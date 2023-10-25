import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import Title from "./components/Title";
import { useAuth } from "./components/auth";

const HomeLayout = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <Title username={user.name}></Title>}
      <Outlet />
    </>
  );
};

export default HomeLayout;
