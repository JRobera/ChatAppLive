import React from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import {
  fetchGroupChat,
  fetchMessages,
} from "../features/messages/messageSlice";

export default function All() {
  const [filterdChats, setCurrentChat, socket] = useOutletContext();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const selectCurrentChat = (data, chatType = "person") => {
    if (chatType == "group") {
      socket.emit("join-group", data?._id);
      setCurrentChat(data);
      dispatch(fetchGroupChat({ _id: data?._id }));
    } else {
      socket.emit("join-chat", user?._id, user?.fullName, data?._id);
      setCurrentChat(data);
      dispatch(fetchMessages({ user: user?._id, currentChat: data?._id }));
    }
  };

  return (
    <div className="flex items-stretch sm:items-center sm:flex-col overflow-x-auto sm:min-h-[420px] sm:max-h-[420px]">
      {filterdChats?.map((chat) => (
        <Chat
          key={chat?._id}
          _id={chat?._id}
          profile={chat?.profile?.img}
          name={chat?.fullName || chat?.groupName}
          lastMessage={
            (chat?.chats[0]?.chats !== undefined &&
            chat?.chats[0]?.chats.length > 0
              ? chat?.chats[0]?.chats[chat?.chats[0]?.chats?.length - 1]
                  ?.message
              : "") || chat?.chats[chat.chats.length - 1]?.message
          }
          time={chat?.chats[0]?.updatedAt || chat?.updatedAt}
          admin={chat?.admin}
          selectCurrentChat={selectCurrentChat}
          chatType={
            chat?.fullName ? "person" : chat?.groupName ? "group" : null
          }
        />
      ))}
    </div>
  );
}
