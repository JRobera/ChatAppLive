import React from "react";
import { BiEditAlt } from "react-icons/bi";

import Avatar from "../Avatar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import axios from "axios";

export default function CreateGroup() {
  const user = useSelector(selectUser);

  const schema = yup.object().shape({
    groupName: yup
      .string("Must be string!")
      .required("Group name is required!"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    const res = await axios.post("http://localhost:4000/api/create-group", {
      ...data,
      admin: user?._id,
    });
    reset();
  };
  return (
    <div className="flex gap-2 w-full items-center">
      <div className=" relative">
        <Avatar style="changeProfile" src="/assets/profile.jpg" />
        <label htmlFor="group-profile" className="absolute right-0 bottom-0">
          <BiEditAlt size={20} color="#fff" />
          <input
            type="file"
            name=""
            id="group-profile"
            accept="image/*"
            hidden
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
        <div className="flex justify-end">
          <button className="bg-white mt-2 rounded-sm p-1">Add</button>
        </div>
      </form>
    </div>
  );
}
