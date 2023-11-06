import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar({ profile }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <header className="flex  p-2">
      {user !== null ? (
        <nav className=" flex flex-1 gap-2 items-center justify-end">
          <div className=" relative">
            <span></span>
            <IoIosNotificationsOutline size={20} />
          </div>
          <div className="flex flex-col items-center">
            <Avatar style="userProfile" src={profile} />
            <p className="text-xs">{user?.fullName}</p>
          </div>
          <button
            onClick={() => {
              Cookies.remove("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav className=" flex gap-2 items-center justify-end w-full shadow-md">
          <span className="font-bold text-lg">
            <Link to="/">Chat</Link>
          </span>
          <div className="flex-1 flex gap-4 justify-end">
            <NavLink
              to="/signin"
              className="text-sm font-semibold p-1 rounded-sm hover:text-[#3f4080]"
            >
              Signin
            </NavLink>

            {/* <NavLink
              to="/signup"
              className="text-sm font-semibold p-1 rounded-sm"
            >
              Signup
            </NavLink> */}
          </div>
        </nav>
      )}
    </header>
  );
}
