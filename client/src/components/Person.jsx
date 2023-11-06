import React, { useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { fetchChats, selectAllpost } from "../features/chats/chatsSlice";
import { useOutletContext } from "react-router-dom";
import { fetchMessages } from "../features/messages/messageSlice";

export default function Person() {
  const [setCurrentChat, socket] = useOutletContext();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chats = useSelector(selectAllpost);

  useEffect(() => {
    dispatch(fetchChats(user?._id)); // Fetch user to chat with
  }, []);

  const selectCurrentChat = (data) => {
    socket.emit("join-chat", user?._id, data?._id);
    setCurrentChat(data);
    dispatch(fetchMessages({ user: user?._id, currentChat: data?._id }));
  };

  return (
    <div className="flex items-center flex-col overflow-x-auto min-h-[420px] max-h-[420px]">
      {chats?.map((chat) => (
        <Chat
          key={chat?._id}
          _id={chat?._id}
          profile={chat?.profile?.img}
          name={chat?.fullName}
          lastMessage={
            chat?.chats[0]?.chats[chat?.chats[0]?.chats.length - 1]?.message
          }
          time={chat?.chats[0]?.updatedAt}
          selectCurrentChat={selectCurrentChat}
        />
      ))}
    </div>
  );
}
