import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateGroupProfile } from "../../features/group/groupSlice";

export default function EditGroup({ currentChat }) {
  const [groupNewProfile, setGroupNewProfile] = useState(null);
  const dispatch = useDispatch();

  const schema = yup.object({
    groupName: yup
      .string("Must be string")
      .required("Group name is required!")
      .default(currentChat.fullName),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const submit = (data) => {
    const formData = new FormData();
    formData.append("groupName", data.groupName);
    formData.append("group_id", currentChat?._id);
    formData.append("group_profile", groupNewProfile);
    dispatch(updateGroupProfile(formData));
    console.log(formData);
    setGroupNewProfile(null);
  };

  return (
    <div className="absolute top-14 right-1 border-2 w-4/5 bg-[#edeefc] p-1 rounded-sm z-10">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
        <label
          htmlFor="group-profile"
          className=" w-full flex justify-center border-dashed border-black border-2 p-2 rounded-sm cursor-pointer text-center"
          title="Upload group profile"
        >
          {groupNewProfile?.name || <IoCloudUploadOutline size={20} />}
          <input
            type="file"
            name=""
            id="group-profile"
            accept="image/*"
            hidden
            onChange={(e) => {
              setGroupNewProfile(e.target.files[0]);
            }}
          />
        </label>
        <div className="relative">
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
        </div>
        <button className="bg-white rounded-sm p-1">Edit</button>
      </form>
    </div>
  );
}
