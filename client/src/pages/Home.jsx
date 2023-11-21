import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    }
  }, []);

  return (
    <div className=" min-h-full flex flex-col">
      <NavBar />
      <div className=" flex justify-center items-center h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}
