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
import { uploadChatAudio, uploadChatImage } from "../lib/uploadfile";
import SelectedFile from "./SelectedFile";

export default function InputComponent({
  socket,
  currentChat,
  replyMessage,
  setreplyMessage,
}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [isChatFileLoading, setIsChatFileLoading] = useState(false);

  const [message, setMessage] = useState({
    senderId: { _id: user?._id, fullName: user?.fullName },
    message: "",
    time: new Date().toISOString(),
    type: "text",
  });

  const sendMessage = async () => {
    setIsChatFileLoading(true);

    if (file === null) {
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
    } else {
      const formData = new FormData();

      if (file.type.slice(0, file.type.indexOf("/")) === "image") {
        // check if file type
        formData.append("chat-image", file);
        const newChatImage = await uploadChatImage(formData);

        if (newChatImage) {
          const temp = {
            senderId: { _id: user?._id, fullName: user?.fullName },
            message: newChatImage?.url,
            public_id: newChatImage?.public_id,
            replyTo: replyMessage,
            user: user?._id,
            currentChat: currentChat?._id,
            time: new Date().toISOString(),
            type: "image",
          };
          const tempG = {
            senderId: { _id: user?._id, fullName: user?.fullName },
            message: newChatImage?.url,
            public_id: newChatImage?.public_id,
            replyTo: replyMessage,
            currentChat: currentChat?._id,
            time: new Date().toISOString(),
            type: "image",
          };

          if (location.pathname === "/home/person") {
            socket.emit("send-message", temp);
            dispatch(postMessage(temp));
            dispatch(addNotification(temp));
          } else {
            socket.emit("send-group-message", tempG);
            dispatch(postGroupMessage(tempG));
          }
        }
      } else if (file.type.slice(0, file.type.indexOf("/")) === "audio") {
        // check if file type
        formData.append("chat-audio", file);
        const newChatAudio = await uploadChatAudio(formData);

        if (newChatAudio) {
          const temp = {
            senderId: { _id: user?._id, fullName: user?.fullName },
            message: newChatAudio?.url,
            public_id: newChatAudio?.public_id,
            replyTo: replyMessage,
            user: user?._id,
            currentChat: currentChat?._id,
            time: new Date().toISOString(),
            type: "audio",
          };
          const tempG = {
            senderId: { _id: user?._id, fullName: user?.fullName },
            message: newChatAudio?.url,
            public_id: newChatAudio?.public_id,
            replyTo: replyMessage,
            currentChat: currentChat?._id,
            time: new Date().toISOString(),
            type: "audio",
          };

          if (location.pathname === "/home/person") {
            socket.emit("send-message", temp);
            dispatch(postMessage(temp));
            dispatch(addNotification(temp));
          } else {
            socket.emit("send-group-message", tempG);
            dispatch(postGroupMessage(tempG));
          }
        }
      }
    }
    setMessage({
      senderId: { _id: user?._id, fullName: user?.fullName },
      message: "",
      replyTo: null,
      time: new Date().toISOString(),
      type: "text",
    });
    setreplyMessage(null);
    setFile(null);
    setIsChatFileLoading(false);
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
      {file && (
        <SelectedFile
          fileName={file.name}
          setFile={setFile}
          isChatFileLoading={isChatFileLoading}
        />
      )}
      <textarea
        name="message"
        id=""
        disabled={file}
        value={message.message}
        onChange={(e) => {
          setMessage((prev) => ({ ...prev, message: e.target.value }));
        }}
        className="flex-1 text-md p-1 resize-none"
        placeholder="Type a message..."
      ></textarea>
      <label
        className=" cursor-pointer hover:bg-[#edeefc] rounded-sm"
        htmlFor="audio"
        title="Select Audio"
      >
        <GiSoundWaves size={20} color="#3f4080" />
        <input
          type="file"
          id="audio"
          accept="audio/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <label
        className=" cursor-pointer hover:bg-[#edeefc] rounded-sm"
        htmlFor="image"
        title="Select Image"
      >
        <CiImageOn size={20} color="#3f4080" />
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <label
        className=" cursor-pointer hover:bg-[#edeefc] rounded-sm p-1"
        htmlFor="send-btn"
      >
        <BsSend size={20} color="#3f4080" />
        <input
          type="button"
          disabled={isChatFileLoading}
          onClick={sendMessage}
          id="send-btn"
          hidden
        />
      </label>
    </div>
  );
}
