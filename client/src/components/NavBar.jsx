import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../features/user/userSlice";
import { Link, NavLink } from "react-router-dom";
import {
  addNewNotification,
  selectAllNotifications,
} from "../features/notification/notificationSlice";
import Notification from "./Notification";

export default function NavBar({ profile, socket }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const notification = useSelector(selectAllNotifications);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    socket?.on("notification", (data) => {
      dispatch(addNewNotification(data));
      unReadnotification();
    });
  }, [socket]);

  const unReadnotification = () => {
    const unRead = [];
    notification?.filter((notif) => {
      if (notif.markasReaden === false) {
        unRead.push(notif);
      }
    });

    return unRead;
  };

  return (
    <header className="flex p-2">
      {user !== null ? (
        <nav className=" flex flex-1 gap-2 items-center justify-end">
          <div className=" relative">
            <div onClick={() => setShowNotification((prev) => !prev)}>
              {unReadnotification()?.length > 0 && (
                <span className="absolute cursor-pointer -top-1 -right-2 bg-red-500 text-xs text-white flex items-center justify-center rounded-full w-4 h-4">
                  {unReadnotification()?.length}
                </span>
              )}

              <IoIosNotificationsOutline size={20} />
            </div>
            {showNotification && <Notification />}
          </div>
          <div className="flex flex-col items-center">
            <Avatar style="userProfile" src={profile} />
            <p className="text-xs">{user?.fullName}</p>
          </div>
          <button
            onClick={() => {
              document.location.href = "/signin";
              dispatch(logOut());
            }}
            aria-label="Logout button"
          >
            <BiLogOut size={20} />
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
