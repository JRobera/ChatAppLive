import React, { useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroup, selectAllGroup } from "../features/group/groupSlice";
import { useOutletContext } from "react-router-dom";
import { fetchGroupChat } from "../features/messages/messageSlice";

export default function Group() {
  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroup);
  const [setCurrentChat, socket] = useOutletContext();

  useEffect(() => {
    dispatch(fetchGroup());
  }, []);

  const selectCurrentChat = (data) => {
    socket.emit("join-group", data?._id);
    setCurrentChat(data);
    dispatch(fetchGroupChat({ _id: data?._id }));
  };

  return (
    <div className="flex items-center flex-col overflow-x-auto min-h-[420px] max-h-[420px]">
      {groups?.map((group) => (
        <Chat
          key={group?._id}
          _id={group?._id}
          profile={group?.profile?.img}
          name={group?.groupName}
          lastMessage={group.chats[group.chats.length - 1].message}
          time={group.updatedAt}
          selectCurrentChat={selectCurrentChat}
        />
      ))}
    </div>
  );
}
