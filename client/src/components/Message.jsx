import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

export default function Message({ senderId, name, type, message, date }) {
  const user = useSelector(selectUser);
  return (
    <>
      {type === "text" ? (
        <div
          className={
            user?._id === senderId
              ? " m-2 p-2 bg-[#edeefc] rounded-md w-1/2 relative self-end"
              : " m-2 p-2 bg-[#f5f5f5] rounded-md w-1/2 relative"
          }
        >
          <span className="text-xs text-[#878ef8] font-bold inline-block mb-2">
            {name}
          </span>
          <p className=" text-sm">{message}</p>
          <span className="absolute right-1 text-xs -bottom-3 text-[#afafb3]">
            {date}
          </span>
        </div>
      ) : type === "image" ? (
        <div
          className={
            user?._id === senderId
              ? " m-2 p-2 bg-[#edeefc] rounded-md w-1/2 relative self-end"
              : " m-2 p-2 bg-[#f5f5f5] rounded-md w-1/2 relative"
          }
        >
          <img
            className=" w-full h-60 rounded-md object-cover"
            src="../public/assets/profile.jpg"
            alt="image"
          />
          <span className="absolute right-1 text-xs -bottom-3 text-[#c3c3c4]">
            {date}
          </span>
        </div>
      ) : type === "audio" ? (
        <div
          className={
            user?._id === senderId
              ? " m-2 p-2 bg-[#edeefc] rounded-md w-1/2 relative self-end"
              : " m-2 p-2 bg-[#f5f5f5] rounded-md w-1/2 relative"
          }
        >
          <audio src=""></audio>
          <span className="absolute right-1 text-xs -bottom-3 text-[#3f4080]">
            {date}
          </span>
        </div>
      ) : null}
    </>
  );
}
