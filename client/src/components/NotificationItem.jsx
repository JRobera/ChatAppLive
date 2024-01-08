import React from "react";
import ReplyHead from "./ReplyHead";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import {
  deleteNotification,
  deleteNotificationAsync,
  markAsReaden,
  markAsReadenAsync,
} from "../features/notification/notificationSlice";

export default function NotificationItem({
  senderId,
  id,
  markasReaden,
  name,
  type,
  message,
  date,
  replyTo,
}) {
  const dispatch = useDispatch();
  const handleMarkAsReaden = (id) => {
    dispatch(markAsReaden(id));
    dispatch(markAsReadenAsync({ id }));
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
    dispatch(deleteNotificationAsync({ id }));
  };

  return (
    <div
      className={
        markasReaden
          ? "w-full p-2 bg-[#f5f5f5] rounded-sm relative self-end flex flex-col"
          : " w-full p-2 bg-chat-bg rounded-sm relative self-end flex flex-col"
      }
    >
      {replyTo && <ReplyHead name={replyTo.name} message={replyTo.message} />}
      <span className="text-xs text-[#878ef8] font-bold inline-block mb-2">
        {name}
      </span>
      {type === "text" ? (
        <p className=" text-sm pb-1">{message}</p>
      ) : type === "image" ? (
        <img
          src={message}
          className=" w-12 h-12 rounded-sm pb-1"
          alt="image in notification"
        />
      ) : (
        <audio src={message} controls className="w-full pb-1"></audio>
      )}
      <span className="absolute right-1 text-xs -bottom-3 text-[#afafb3]">
        {formatDistanceToNow(parseISO(date)) + " ago"}
      </span>
      {markasReaden ? (
        <button
          className=" bg-white text-xs font-semibold p-1 rounded-sm border-[1px] justify-end"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(id);
          }}
        >
          Delete
        </button>
      ) : (
        <button
          className=" bg-white text-xs font-semibold p-1 rounded-sm justify-end"
          onClick={(e) => {
            e.preventDefault();
            handleMarkAsReaden(id);
          }}
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
