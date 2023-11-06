import React from "react";
import Avatar from "./Avatar";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Chat({
  _id,
  profile,
  name,
  lastMessage,
  time,
  selectCurrentChat,
}) {
  const user = {
    _id,
    fullName: name,
    profile: profile,
  };

  return (
    <div
      className=" bg-[#ffffff] cursor-pointer w-full flex gap-2 items-center p-2 hover:bg-[#edeefc]"
      onClick={() => selectCurrentChat(user)}
    >
      <Avatar style="chatProfile" src={profile} />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-semibold text-sm">{name}</p>
          <span className="text-md text-xs text-slate-500">
            {time ? formatDistanceToNow(parseISO(time)) + " ago" : ""}
          </span>
        </div>
        <span className="text-md text-xs">{lastMessage}</span>
      </div>
    </div>
  );
}
