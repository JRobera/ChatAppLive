import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccessToken,
  getUserStatus,
  refreshToken,
  selectUser,
} from "./features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";
import SpinnerWrapper from "./components/SpinnerWrapper";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const accessToken = useSelector(getUserAccessToken);
  const userStatus = useSelector(getUserStatus);
  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshToken());
    }
  }, []);

  if (userStatus === "failed") {
    return <Navigate to="/" replace />;
  }
  return <>{userStatus === "loading" ? <SpinnerWrapper /> : <Outlet />}</>;
}
