import React from "react";

export default function ReplyHead({ name, message }) {
  return (
    <div className=" border-b-2">
      <p className="text-[#878ef8] text-xs font-semibold">{name}</p>
      <p className="text-[#3f3f40] text-xs">{message.substring(0, 20)}</p>
    </div>
  );
}
