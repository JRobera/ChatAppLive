import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserStatus,
  refreshToken,
  selectUser,
} from "./features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  useEffect(() => {
    dispatch(refreshToken());
  }, []);
  if (userStatus === "loading") return <div>Loading...</div>;
  return <>{user ? <Outlet /> : <Navigate to="/" replace />}</>;
}
