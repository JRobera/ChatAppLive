import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import Messages from "../components/Messages";
import InputComponent from "../components/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  // getUserStatus,
  selectUser,
} from "../features/user/userSlice";
import { restMessage } from "../features/messages/messageSlice";
import { fetchNotification } from "../features/notification/notificationSlice";
import CurrentChatInfo from "../components/currentchatinfo/CurrentChatInfo";
import {
  fetchGroup,
  getGroupStatus,
  selectAllGroup,
  setGroupStatus,
} from "../features/group/groupSlice";
import {
  fetchChats,
  getChatStatus,
  selectAllChats,
} from "../features/chats/chatsSlice";
import UserSkeleton from "../skeleton/UserSkeleton.jsx";
import { socket } from "../socket.js";

export default function RootLayout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const userStatus = useSelector(getUserStatus);
  const chats = useSelector(selectAllChats);
  const chatStatus = useSelector(getChatStatus);
  const groups = useSelector(selectAllGroup);
  const groupStatus = useSelector(getGroupStatus);
  const [currentChat, setCurrentChat] = useState(null);
  const [replyMessage, setreplyMessage] = useState(null);
  const [filterdChats, setFilterdChats] = useState([]);
  // const navigate = useNavigate();
  const location = useLocation();
  const handleFilteredUsers = (data) => {
    setFilterdChats(data);
  };
  const selectList = useCallback(() => {
    if (location.pathname === "/home/person") {
      return chats;
    } else if (location.pathname === "/home/group") {
      return groups;
    } else if (location.pathname === "/home") {
      return [...chats, ...groups];
    }
    return [];
  }, [chats, groups, location.pathname]);

  useEffect(() => {
    socket.emit("user-data", user?._id);
    dispatch(fetchNotification(user?._id));
    dispatch(fetchChats(user?._id));
    dispatch(fetchGroup(user?._id));
    dispatch(setGroupStatus("idle"));
  }, []);

  useEffect(() => {
    setFilterdChats(selectList()); // Update after data is fetched
  }, [chats, groups, location.pathname]);

  useEffect(() => {
    dispatch(restMessage());
  }, [currentChat]);

  return (
    <div className="flex h-full flex-col-reverse sm:flex-row overflow-auto">
      <SideBar />
      <div className=" flex-1">
        <NavBar profile={user?.profile} socket={socket} />
        <div className="chatWindow flex flex-col sm:flex-row m-2 mt-0 border-2 min-h-[480px] sm:max-h-[485px] overflow-x-auto rounded-md">
          <div className="sm:border-r-2 flex-1 pt-2 flex flex-col">
            <SearchBar
              list={selectList()}
              handleFilteredUsers={handleFilteredUsers}
            />
            {chatStatus === "loading" || groupStatus === "loading" ? (
              <div className="flex gap-1 items-center sm:flex-col overflow-x-auto sm:min-h-[420px] sm:max-h-[420px]">
                {[...Array(7).keys()].map((i) => (
                  <UserSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Outlet context={[filterdChats, setCurrentChat, socket]} />
            )}
          </div>

          <div className="flex-[2]">
            {/* Current Chat Info Bar */}
            <CurrentChatInfo currentChat={currentChat} />

            <Messages
              socket={socket}
              currentChat={currentChat}
              setreplyMessage={setreplyMessage}
            />
            <InputComponent
              socket={socket}
              currentChat={currentChat}
              replyMessage={replyMessage}
              setreplyMessage={setreplyMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
