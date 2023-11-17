import React, { useEffect } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberToGroup,
  removeMemberFromGroup,
} from "../../features/group/groupSlice";

export default function SearchItem({ id, fullName, currentChat }) {
  const dispatch = useDispatch();

  const handleAddMember = () => {
    dispatch(addMemberToGroup({ id, group_id: currentChat?._id }));
  };
  const handleRemoveMember = () => {
    dispatch(removeMemberFromGroup({ id, group_id: currentChat?._id }));
  };

  return (
    <div className="flex border-[1px] bg-white p-1 rounded-sm">
      <p className="flex-1 text-sm">{fullName}</p>
      <div className="flex gap-2">
        <button
          className="p-[1px] hover:bg-[#edeefc]"
          onClick={handleAddMember}
        >
          <IoPersonAddOutline size={20} />
        </button>
        <button
          className="p-[1px] hover:bg-[#edeefc]"
          onClick={handleRemoveMember}
        >
          <HiOutlineUserMinus size={20} />
        </button>
      </div>
    </div>
  );
}
