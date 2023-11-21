import React from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { fetchGroupChat } from "../features/messages/messageSlice";

export default function Group() {
  const [filterdChats, setCurrentChat, socket] = useOutletContext();
  const dispatch = useDispatch();

  const selectCurrentChat = (data) => {
    socket.emit("join-group", data?._id);
    setCurrentChat(data);
    dispatch(fetchGroupChat({ _id: data?._id }));
  };

  return (
    <div className="flex items-center sm:flex-col overflow-x-auto sm:min-h-[420px] sm:max-h-[420px]">
      {filterdChats?.map((group) => (
        <Chat
          key={group?._id}
          _id={group?._id}
          profile={group?.profile?.img}
          admin={group?.admin}
          name={group?.groupName}
          lastMessage={group.chats[group.chats.length - 1]?.message}
          time={group.updatedAt}
          selectCurrentChat={selectCurrentChat}
        />
      ))}
    </div>
  );
}
