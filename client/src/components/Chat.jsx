import React from "react";
import Avatar from "./Avatar";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Chat({
  _id,
  profile,
  admin,
  name,
  lastMessage,
  time,
  selectCurrentChat,
  chatType,
}) {
  const user = {
    _id,
    fullName: name,
    profile: profile,
    admin: admin,
  };

  return (
    <div
      className=" bg-[#ffffff] cursor-pointer flex-shrink-0 w-28 sm:w-full flex flex-col sm:flex-row gap-2 items-center p-2 hover:bg-[#edeefc]"
      onClick={() => selectCurrentChat(user, chatType)}
    >
      <Avatar style="chatProfile" src={profile} />
      <div className="sm:flex-1">
        <div className="flex justify-between flex-col sm:flex-row">
          <p className="font-semibold text-sm">{name}</p>
          <span className="text-md text-xs text-slate-500">
            {time ? formatDistanceToNow(parseISO(time)) + " ago" : ""}
          </span>
        </div>
        <span className="text-md text-xs">
          {lastMessage && lastMessage?.substring(0, 15) + "..."}
        </span>
      </div>
    </div>
  );
}
