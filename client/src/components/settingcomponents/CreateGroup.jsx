import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import Avatar from "../Avatar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import axios from "axios";
import { createGroup } from "../../features/group/groupSlice";

export default function CreateGroup() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [groupProfile, setGroupProfile] = useState(null);

  const schema = yup.object().shape({
    groupName: yup
      .string("Must be string!")
      .required("Group name is required!"),
    group_type: yup.boolean("Must be boolean value"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    console.log(groupProfile);
    const formData = new FormData();
    formData.append("groupName", data.groupName);
    formData.append("group_type", data.group_type);
    formData.append("admin", user?._id);
    formData.append("groupProfile", groupProfile);
    dispatch(createGroup(formData));
    reset();
    setGroupProfile(null);
  };

  const handleGroupProfile = (e) => {
    setGroupProfile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="group-profile"
          className="w-full flex justify-center border-dashed border-black border-2 p-2 rounded-sm cursor-pointer text-center"
        >
          {groupProfile?.name || <IoCloudUploadOutline size={20} />}
          <input
            type="file"
            name=""
            id="group-profile"
            accept="image/*"
            hidden
            onChange={handleGroupProfile}
          />
        </label>
      </div>

      <form className="relative w-full" onSubmit={handleSubmit(submit)}>
        {errors.groupName && (
          <span className="absolute w-full text-xs text-red-600">
            {errors.groupName.message}
          </span>
        )}
        <input
          className="w-full mt-4 p-1 outline-none border-none rounded-sm"
          type="text"
          placeholder="Enter group name"
          {...register("groupName")}
        />
        <div className="flex items-center">
          <div className="flex flex-1">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked
              {...register("group_type")}
            />
            <label htmlFor="group-type" className=" text-xs ml-2">
              Public Group
            </label>
          </div>
          <button className="bg-white mt-2 rounded-sm p-1">Add</button>
        </div>
      </form>
    </div>
  );
}
