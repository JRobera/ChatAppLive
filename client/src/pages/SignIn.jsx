import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserError,
  getUserMessage,
  getUserStatus,
  loginUser,
  selectUser,
  setUserStatus,
} from "../features/user/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  const userMessage = useSelector(getUserMessage);
  const userError = useSelector(getUserError);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      navigate("/home/person");
    }
  }, [user]);

  const schema = yup.object().shape({
    email: yup
      .string("Must be string")
      .email("Invalid email format!")
      .required("Email is required"),
    password: yup
      .string("Must be string")
      .required("Password is required")
      .min(4, "Password must be greater than 4 character"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (userStatus === "succeeded" && userMessage) {
      toast.success(userMessage);
      dispatch(setUserStatus("idle"));
      reset();
    } else if (userStatus === "failed" && userError) {
      toast.error(userError);
      dispatch(setUserStatus("idle"));
      reset();
    }
  }, [userStatus]);

  return (
    <form
      className=" w-4/5 sm:w-2/5 flex flex-col gap-2 bg-card-bg p-3 pb-5 rounded-md"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-center text-[#3f4080] font-semibold">SingnIn</h2>
      <div className="relative ">
        {errors.email && (
          <span className="absolute w-full text-xs text-red-600">
            {errors.email.message}
          </span>
        )}
        <input
          className="w-full mt-4 p-1 outline-none border-none rounded-sm"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
      </div>
      <div className="relative ">
        {errors.password && (
          <span className="absolute w-full text-xs text-red-600">
            {errors.password.message}
          </span>
        )}
        <input
          className="w-full mt-4 p-1 outline-none border-none rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          {...register("password")}
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
      <button className="bg-white mt-2 rounded-sm p-1">
        SignIn
        {userStatus === "loading" && (
          <span className="w-3 h-3 ml-1 inline-block rounded-full border-slate-400 border-2 border-x-transparent animate-spin"></span>
        )}
      </button>
      <p className="text-sm">
        Don't have account?{" "}
        <Link
          to="/"
          className=" font-bold hover:text-[#3f4080] hover:underline"
        >
          Signup
        </Link>
      </p>
    </form>
  );
}
