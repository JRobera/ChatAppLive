import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PiPlusMinus } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import Avatar from "../Avatar";
import { selectUser } from "../../features/user/userSlice";
import EditGroup from "./EditGroup";
import EditGroupMember from "./EditGroupMember";
import { fetchChats } from "../../features/chats/chatsSlice";

export default function CurrentChatInfo({ currentChat }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [showEditGroupMember, setShowEditGroupMember] = useState(false);

  useEffect(() => {
    dispatch(fetchChats(user?._id));
  }, []);

  return (
    <div className="border-b-2 flex justify-between items-center pr-2 min-h-[54px] relative">
      {currentChat && (
        <div className="flex gap-2 p-2 items-center">
          <Avatar style="chatProfile" src={currentChat?.profile} />
          <div className="text-sm font-semibold">{currentChat?.fullName}</div>
        </div>
      )}
      {location.pathname === "/home/group" &&
      currentChat?.admin === user?._id ? (
        <div className="flex gap-2">
          <span
            className="flex-1 flex justify-end p-1 cursor-pointer hover:bg-[#edeefc] hover:rounded-sm "
            title="Edit group Info"
            onClick={() => {
              setShowEditGroup((prev) => !prev);
              setShowEditGroupMember(false);
            }}
          >
            <FiEdit size={15} />
          </span>
          <span
            className="flex-1 flex justify-end p-1 cursor-pointer hover:bg-[#edeefc] hover:rounded-sm "
            title="Add or Delete members"
            onClick={() => {
              setShowEditGroupMember((prev) => !prev);
              setShowEditGroup(false);
            }}
          >
            <PiPlusMinus size={15} />
          </span>
        </div>
      ) : null}
      {showEditGroup && <EditGroup currentChat={currentChat} />}
      {showEditGroupMember && <EditGroupMember currentChat={currentChat} />}
    </div>
  );
}
