import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroupMessageAsync,
  deleteMessage,
  deleteMessageAsync,
} from "../features/messages/messageSlice.js";
import { useLocation } from "react-router-dom";

export default function MoreMenu({
  handleMore,
  handleReply,
  _id,
  message,
  name,
}) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const location = useLocation();
  const menu = ["Reply", "Delete"];

  const handleEditMessage = () => {
    const filtered = messages.filter((message) => message._id !== _id);
    console.log(filtered);
  };
  const handleDeleteMessage = () => {
    dispatch(deleteMessage(_id));
    if (location.pathname === "/home/person") {
      dispatch(deleteMessageAsync({ room: messages?.room, _id: _id }));
    } else {
      dispatch(
        deleteGroupMessageAsync({ group_id: messages?._id, message_id: _id })
      );
    }
  };

  const handleSelectedOption = (actionName) => {
    if (actionName === "Reply") {
      handleReply({ _id, message, name });
      handleMore();
    } else if (actionName === "Edit") {
      handleEditMessage();
      handleMore();
    } else {
      handleDeleteMessage();
      handleMore();
    }
  };
  return (
    <div className="absolute right-1 top-5 z-10 flex flex-col gap-1 text-xs bg-white p-2 border-[1px] rounded-sm">
      {menu.map((item, idx) => (
        <span
          className=" cursor-pointer hover:bg-[#edeefc] p-1"
          key={idx}
          onClick={() => {
            handleSelectedOption(item);
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
