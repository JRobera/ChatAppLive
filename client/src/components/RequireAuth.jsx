import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import SpinnerWrapper from "./SpinnerWrapper";

export default function RequireAuth() {
  const user = useSelector(selectUser);
  const location = useLocation();
  if (!user) {
    return <SpinnerWrapper />;
  }

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
}
