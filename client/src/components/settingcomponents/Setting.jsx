import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import CreateGroup from "./CreateGroup";
import ChangePassword from "./ChangePassword";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserStatus,
  selectUser,
  updateUserName,
} from "../../features/user/userSlice";

export default function Setting({ handleShowSetting }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(getUserStatus);
  const [userName, setUserName] = useState(user?.fullName);
  const [showChangePassword, setChangePassword] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     toast.success("Name Chageded");
  //   } else if (status === "failed") {
  //     toast.error("Something went wrong!");
  //   }
  // }, [status]);

  return (
    <div className="flex flex-col gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-2 rounded-sm bg-[#edeefc] border-2 shadow-sm z-10">
      <div className="flex border-b-2">
        <h2 className="flex-1 font-bold">Setting</h2>
        <p onClick={handleShowSetting}>
          <AiOutlineClose size={20} />
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative w-max">
          <Avatar style="changeProfile" src={user?.profile} />
          <label htmlFor="user-profile" className="absolute right-0 bottom-0">
            <BiEditAlt size={20} color="#fff" />
            <input
              type="file"
              name=""
              id="user-profile"
              accept="image/*"
              hidden
            />
          </label>
        </div>
        <div className="flex gap-2">
          <input
            className="p-1 rounded-sm flex-1"
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(userName);
              dispatch(updateUserName({ _id: user?._id, newName: userName }));
              if (status === "succeeded") {
                toast.success("Name Chageded");
              } else if (status === "failed") {
                toast.error("Something went wrong!");
              }
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-2">
        <button onClick={() => setChangePassword((prev) => !prev)}>
          Change Password
        </button>
        {showChangePassword && <ChangePassword />}
        <button onClick={() => setShowCreateGroup((prev) => !prev)}>
          Create Group
        </button>
        {showCreateGroup && <CreateGroup />}
      </div>
    </div>
  );
}
