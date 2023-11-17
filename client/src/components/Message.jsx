import React, { useState } from "react";
import { TfiMore } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import MoreMenu from "./MoreMenu";
import ReplyHead from "./ReplyHead";

export default function Message({
  senderId,
  name,
  type,
  message,
  _id,
  date,
  replyTo,
  handleReply,
}) {
  const user = useSelector(selectUser);
  const [showMore, setShowMore] = useState(false);

  const handleMore = () => setShowMore((prev) => !prev);

  let messageType;
  if (type === "text") {
    messageType = (
      <div
        className={
          user?._id === senderId
            ? " m-2 p-2 bg-[#edeefc] rounded-md w-1/2 relative self-end"
            : " m-2 p-2 bg-[#f5f5f5] rounded-md w-1/2 relative"
        }
      >
        <div
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleMore}
        >
          <TfiMore size={20} />
        </div>
        {replyTo && <ReplyHead name={replyTo.name} message={replyTo.message} />}
        <span className="text-xs text-[#878ef8] font-bold inline-block mb-2">
          {name}
        </span>
        <p className=" text-sm">{message}</p>
        <span className="absolute right-1 text-xs -bottom-3 text-[#afafb3]">
          {date}
        </span>
        {showMore && (
          <MoreMenu
            handleMore={handleMore}
            handleReply={handleReply}
            name={name}
            message={message}
            _id={_id}
          />
        )}
      </div>
    );
  } else if (type === "image") {
    messageType = (
      <div
        className={
          user?._id === senderId
            ? " m-2 p-2 bg-[#edeefc] rounded-md w-1/2 relative self-end"
            : " m-2 p-2 bg-[#f5f5f5] rounded-md w-1/2 relative"
        }
      >
        <div
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleMore}
        >
          <TfiMore size={20} />
        </div>
        {replyTo && <ReplyHead name={replyTo.name} message={replyTo.message} />}
        <span className="text-xs text-[#878ef8] font-bold inline-block mb-2">
          {name}
        </span>
        <img
          className=" w-full h-60 rounded-md object-cover"
          src={message}
          alt="image"
        />
        <span className="absolute right-1 text-xs -bottom-3 text-[#c3c3c4]">
          {date}
        </span>
        {showMore && (
          <MoreMenu
            handleMore={handleMore}
            handleReply={handleReply}
            name={name}
            message={message}
            _id={_id}
          />
        )}
      </div>
    );
  } else {
    messageType = (
      <div
        className={
          user?._id === senderId
            ? " m-2 p-2 bg-[#edeefc] rounded-md w-4/5 md:w-3/5 relative self-end"
            : " m-2 p-2 bg-[#f5f5f5] rounded-md w-4/5 md:w-3/5 relative"
        }
      >
        <div
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleMore}
        >
          <TfiMore size={20} />
        </div>
        {replyTo && <ReplyHead name={replyTo.name} message={replyTo.message} />}
        <span className="text-xs text-[#878ef8] font-bold inline-block mb-2">
          {name}
        </span>
        <audio src={message} controls className="w-full"></audio>
        <span className="absolute right-1 text-xs -bottom-3 text-[#3f4080]">
          {date}
        </span>
        {showMore && (
          <MoreMenu
            handleMore={handleMore}
            handleReply={handleReply}
            name={name}
            message={message}
            _id={_id}
          />
        )}
      </div>
    );
  }

  return <>{messageType}</>;
}
