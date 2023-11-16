import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postGroupMessage,
  postMessage,
} from "../features/messages/messageSlice";
import { selectUser } from "../features/user/userSlice";
import ReplyMessage from "./ReplyMessage";
import { addNotification } from "../features/notification/notificationSlice";

export default function InputComponent({
  socket,
  currentChat,
  replyMessage,
  setreplyMessage,
}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();

  const [message, setMessage] = useState({
    senderId: { _id: user?._id, fullName: user?.fullName },
    message: "",
    time: new Date().toISOString(),
    type: "text",
  });

  const sendMessage = () => {
    const temp = {
      ...message,
      replyTo: replyMessage,
      user: user?._id,
      currentChat: currentChat?._id,
      type: "text",
    };
    const tempG = {
      ...message,
      replyTo: replyMessage,
      currentChat: currentChat?._id,
      type: "text",
    };

    if (location.pathname === "/home/person") {
      socket.emit("send-message", temp);
      dispatch(postMessage(temp));
      dispatch(addNotification(temp));
    } else {
      socket.emit("send-group-message", tempG);
      dispatch(postGroupMessage(tempG));
    }

    setMessage({
      senderId: { _id: user?._id, fullName: user?.fullName },
      message: "",
      replyTo: null,
      time: new Date().toISOString(),
      type: "text",
    });
    setreplyMessage(null);
  };
  // console.log(replyMessage);
  return (
    <div className="border-t-2 flex gap-1 items-center p-1 relative">
      {replyMessage && (
        <ReplyMessage
          name={replyMessage?.name}
          message={replyMessage?.message}
          setreplyMessage={setreplyMessage}
        />
      )}
      <textarea
        name="message"
        id=""
        value={message.message}
        onChange={(e) => {
          setMessage((prev) => ({ ...prev, message: e.target.value }));
        }}
        className="flex-1 text-md p-1 resize-none"
        placeholder="Type a message..."
      ></textarea>
      <label className=" cursor-pointer" htmlFor="audio">
        <GiSoundWaves size={20} color="#3f4080" />
        <input type="file" id="audio" accept="audio/*" hidden />
      </label>
      <label className=" cursor-pointer" htmlFor="image">
        <CiImageOn size={20} color="#3f4080" />
        <input type="file" id="image" accept="image/*" hidden />
      </label>
      <label className=" cursor-pointer" htmlFor="send-btn">
        <BsSend size={20} color="#3f4080" />
        <input type="button" onClick={sendMessage} id="send-btn" hidden />
      </label>
    </div>
  );
}
