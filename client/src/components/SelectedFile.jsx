import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SelectedFile({ fileName, setFile, isChatFileLoading }) {
  return (
    <div className="text-sm absolute -top-[31px] w-full left-0 bg-[#f5f5f5] border-[1px] flex p-1 items-center">
      <div className="flex-1 flex gap-1 items-center">
        <p className="text-xs font-bold">File: </p>
        <p className="text-[#3f3f40]">{fileName}</p>
        {isChatFileLoading && (
          <span className="ml-4">
            <AiOutlineLoading3Quarters className=" animate-spin" size={15} />
          </span>
        )}
      </div>
      <span
        onClick={() => {
          setFile(null);
        }}
      >
        <AiOutlineClose size={15} />
      </span>
    </div>
  );
}
