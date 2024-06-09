import React, { useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useOutletContext } from "react-router-dom";
import { fetchMessages } from "../features/messages/messageSlice";

export default function Person() {
  const [filterdChats, setCurrentChat, socket] = useOutletContext();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const selectCurrentChat = (data) => {
    socket.emit("join-chat", user?._id, user?.fullName, data?._id);
    setCurrentChat(data);
    dispatch(fetchMessages({ user: user?._id, currentChat: data?._id }));
  };

  return (
    <div className="flex items-center sm:flex-col overflow-x-auto gap-[1px] min-h-[120px] sm:min-h-[420px] sm:max-h-[420px] m-[1px]">
      {filterdChats?.map((chat) => (
        <Chat
          key={chat?._id}
          _id={chat?._id}
          profile={chat?.profile?.img}
          name={chat?.fullName}
          lastMessage={
            chat?.chats[0]?.chats !== undefined &&
            chat?.chats[0]?.chats.length > 0
              ? chat?.chats[0]?.chats[chat?.chats[0]?.chats?.length - 1]
                  ?.message
              : ""
          }
          time={chat?.chats[0]?.updatedAt}
          selectCurrentChat={selectCurrentChat}
        />
      ))}
    </div>
  );
}
