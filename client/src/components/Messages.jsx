import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "../features/messages/messageSlice";
import { parseISO } from "date-fns";

export default function Messages({ socket }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    {
      location.pathname === "/home/person"
        ? socket.on("receive-message", (data) => {
            dispatch(addNewMessage(data));
          })
        : socket.on("receive-group-message", (data) => {
            dispatch(addNewMessage(data));
          });
    }
  }, [socket]);

  // console.log(messages);
  return (
    <div className=" min-h-[360px] max-h-[360px] overflow-x-auto flex flex-col">
      {messages?.map((message, idx) => (
        <Message
          key={idx}
          senderId={message?.senderId?._id}
          name={message?.senderId?.fullName}
          type={message?.type}
          message={message?.message}
          date={parseISO(message?.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      ))}
      {/* <Message type="image" />
      <Message type="text" />
      <Message type="image" /> */}
      <div ref={containerRef}></div>
    </div>
  );
}
