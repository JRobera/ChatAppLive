import React, { useEffect, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserPassword,
  getUserError,
  getUserStatus,
  selectUser,
  setUserStatus,
} from "../../features/user/userSlice";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    oldPassword: yup
      .string("Must be a string")
      .required("Password is required!")
      .min(4, "Password must be grater than 4 characters"),
    newPassword: yup
      .string("Must be a string")
      .required("Confirm password is required!")
      .min(4, "Password must be grater than 4 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = (data) => {
    dispatch(changeUserPassword({ _id: user?._id, ...data }));
    reset();
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(submit)}
    >
      <div className="relative ">
        {errors.oldPassword && (
          <span className="absolute w-full text-xs text-red-600">
            {errors?.newPassword?.message}
          </span>
        )}
        <input
          className="w-full mt-4 p-1 outline-none border-none rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Enter old password"
          {...register("oldPassword")}
        />
        <span
          className="absolute top-4 right-0 p-1 h-8 border-l-[1px] rounded-ee-sm rounded-se-sm"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
        </span>
      </div>
      <div className="relative ">
        {errors.newPassword && (
          <span className="absolute w-full text-xs text-red-600">
            {errors?.newPassword?.message}
          </span>
        )}
        <input
          className="w-full mt-4 p-1 outline-none border-none rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          {...register("newPassword")}
        />
        <span
          className="absolute top-4 right-0 p-1 h-8 border-l-[1px] rounded-ee-sm rounded-se-sm"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
        </span>
      </div>
      <button className="bg-white mt-2 rounded-sm p-1" type="submit">
        Change
      </button>
    </form>
  );
}
