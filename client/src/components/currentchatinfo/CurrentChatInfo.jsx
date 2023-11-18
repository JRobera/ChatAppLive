import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PiPlusMinus } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import Avatar from "../Avatar";
import { selectUser } from "../../features/user/userSlice";
import EditGroup from "./EditGroup";
import EditGroupMember from "./EditGroupMember";
import { fetchChats } from "../../features/chats/chatsSlice";
import {
  getGroupError,
  getGroupMessage,
  getGroupStatus,
  setGroupStatus,
} from "../../features/group/groupSlice";

export default function CurrentChatInfo({ currentChat }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [showEditGroupMember, setShowEditGroupMember] = useState(false);

  const groupStatus = useSelector(getGroupStatus);
  const groupMessage = useSelector(getGroupMessage);
  const groupError = useSelector(getGroupError);

  useEffect(() => {
    if (groupStatus === "suceeded") {
      toast.success(groupMessage);
      dispatch(setGroupStatus("idle"));
    } else if (groupStatus === "failed") {
      toast.error(groupError);
      dispatch(setGroupStatus("idle"));
    }
  }, [groupStatus]);

  // useEffect(() => {
  // dispatch(fetchChats(user?._id));
  // }, []);

  return (
    <div className="border-y-2 sm:border-b-2 sm:border-t-0 flex justify-between items-center pr-2 min-h-[54px] relative">
      {currentChat && (
        <div className="flex gap-2 p-2 items-center">
          <Avatar style="chatProfile" src={currentChat?.profile} />
          <div className="text-sm font-semibold">{currentChat?.fullName}</div>
        </div>
      )}
      {currentChat?.admin === user?._id ? (
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
