import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import api from "../features/axios";
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

const socket = io(api.defaults.baseURL);

export default function RootLayout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chats = useSelector(selectAllChats);
  const chatStatus = useSelector(getChatStatus);
  const groups = useSelector(selectAllGroup);
  const groupStatus = useSelector(getGroupStatus);
  const [currentChat, setCurrentChat] = useState(null);
  const [replyMessage, setreplyMessage] = useState(null);
  const [filterdChats, setFilterdChats] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const handleFilteredUsers = (data) => {
    setFilterdChats(data);
  };
  const selectList = () => {
    if (location.pathname === "/home/person") {
      return chats;
    } else if (location.pathname === "/home/group") {
      return groups;
    } else if (location.pathname === "/home") {
      return [...chats, ...groups];
    }
  };

  useEffect(() => {
    if (user === null) {
      console.log(user);
      return navigate("/");
    }
    socket.emit("user-data", user?._id);
    dispatch(fetchNotification(user?._id));
    dispatch(fetchChats(user?._id));
    dispatch(fetchGroup(user?._id));
    setFilterdChats(selectList());
    dispatch(setGroupStatus("idle"));
  }, []);

  useEffect(() => {
    dispatch(restMessage());
  }, [currentChat]);
  useEffect(() => {
    setFilterdChats(selectList());
  }, [location.pathname]);

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1">
        <NavBar profile={user?.profile} socket={socket} />
        <div className="chatWindow flex m-2 border-2 min-h-[480px] max-h-[485px] overflow-x-auto rounded-md">
          {chatStatus === "loading" || groupStatus === "loading" ? (
            <div className="border-r-2 flex-1 pt-2 flex flex-col">
              Loading...
            </div>
          ) : (
            <div className="border-r-2 flex-1 pt-2 flex flex-col">
              <SearchBar
                list={selectList()}
                handleFilteredUsers={handleFilteredUsers}
              />
              <Outlet context={[filterdChats, setCurrentChat, socket]} />
            </div>
          )}
          <div className="flex-[2]">
            {/* Current Chat Info Bar */}
            <CurrentChatInfo currentChat={currentChat} />

            <Messages socket={socket} setreplyMessage={setreplyMessage} />
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
