import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAllChats } from "../../features/chats/chatsSlice";
import SearchItem from "./SearchItem";
import { selectUser } from "../../features/user/userSlice";

export default function EditGroupMember({ currentChat }) {
  const dispatch = useDispatch();
  const chats = useSelector(selectAllChats);
  const user = useSelector(selectUser);
  const [filterdChats, setFilterdChats] = useState(chats);

  const handleFilteredUsers = (data) => {
    setFilterdChats(data);
  };

  return (
    <div className="absolute top-14 right-1 border-2 w-4/5 bg-[#edeefc] p-1 rounded-sm z-10">
      <SearchBar list={chats} handleFilteredUsers={handleFilteredUsers} />
      {filterdChats?.map((chat, idx) => (
        <SearchItem
          key={idx}
          id={chat?._id}
          fullName={chat?.fullName}
          currentChat={currentChat}
        />
      ))}
    </div>
  );
}
