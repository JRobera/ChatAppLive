import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessage,
  fetchGroupChat,
} from "../features/messages/messageSlice";
import { parseISO } from "date-fns";
import { selectUser } from "../features/user/userSlice";

export default function Messages({ socket, currentChat, setreplyMessage }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const messages = useSelector((state) => state.messages.messages);
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    location.pathname === "/home/person"
      ? socket.on("receive-message", (data) => {
          dispatch(addNewMessage(data));
          if (currentChat)
            dispatch(
              fetchMessages({
                user: user?._id,
                currentChat: currentChat?._id,
              })
            );
        })
      : location.pathname === "/home/group"
      ? socket.on("receive-group-message", (data) => {
          dispatch(addNewMessage(data));
          if (currentChat) dispatch(fetchGroupChat({ _id: currentChat?._id }));
        })
      : null;

    // console.log(currentChat?.chatType);
  }, [socket]);

  const handleReply = (data) => {
    // console.log(data);
    setreplyMessage(data);
  };

  // console.log(messages);
  return (
    <div className=" min-h-[255px] max-h-[255px] sm:min-h-[360px] sm:max-h-[360px] overflow-x-auto flex flex-col">
      {messages?.chats?.map((message, idx) => (
        <Message
          key={idx}
          senderId={message?.senderId?._id}
          name={message?.senderId?.fullName}
          type={message?.type}
          message={message?.message}
          _id={message?._id}
          date={parseISO(message?.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          replyTo={message?.replyTo}
          handleReply={handleReply}
        />
      ))}
      {/* <Message type="image" />
      <Message type="text" />
      <Message type="image" /> */}
      <div ref={containerRef}></div>
    </div>
  );
}
