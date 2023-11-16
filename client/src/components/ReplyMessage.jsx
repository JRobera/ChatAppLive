import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ReplyMessage({ name, message, setreplyMessage }) {
  return (
    <div className="text-sm absolute -top-2/3 w-full left-0 bg-[#f5f5f5] border-[1px] flex p-1">
      <div className="flex-1 flex gap-1">
        <p className="text-[10px] font-bold">Reply</p>
        <div>
          <p className="text-[#878ef8] text-xs font-bold">{name}</p>
          <p className="text-[#3f3f40]">{message.substring(0, 20)}</p>
        </div>
      </div>
      <span
        onClick={() => {
          setreplyMessage(null);
        }}
      >
        <AiOutlineClose size={15} />
      </span>
    </div>
  );
}
