import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import Avatar from "../components/Avatar";
import Messages from "../components/Messages";
import InputComponent from "../components/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { io } from "socket.io-client";
import { restMessage } from "../features/messages/messageSlice";

const socket = io("http://localhost:4000");

export default function RootLayout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [currentChat, setCurrentChat] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      console.log(user);
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(restMessage());
  }, [currentChat]);

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1">
        <NavBar profile={user?.profile} />
        <div className="chatWindow flex m-2 border-2 min-h-[480px] max-h-[485px] overflow-x-auto rounded-md">
          <div className="border-r-2 flex-1 pt-2 flex flex-col">
            <SearchBar />
            <Outlet context={[setCurrentChat, socket]} />
          </div>
          <div className="flex-[2]">
            <div className="border-b-2 flex justify-between items-center pr-2 min-h-[54px]">
              {currentChat && (
                <div className="flex gap-2 p-2 items-center">
                  <Avatar style="chatProfile" src={currentChat?.profile} />
                  <div className="text-sm font-semibold">
                    {currentChat?.fullName}
                  </div>
                </div>
              )}
              {location.pathname === "/home/group" ? (
                <span className="flex-1 flex justify-end">
                  <BsPlusLg size={20} />
                </span>
              ) : null}
            </div>
            <Messages socket={socket} />
            <InputComponent socket={socket} currentChat={currentChat} />
          </div>
        </div>
      </div>
    </div>
  );
}
