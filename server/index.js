import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

// Routes
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import groupRoute from "./routes/group.route.js";
import notificationRoute from "./routes/notification.route.js";

import dbConnect from "./db/dbConnect.js";
import checkRoom from "./lib/checkRoom.js";

dbConnect();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// User tracking data structure
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log(socket.id);

  // add user id to user tracker
  socket.on("user-data", (user) => {
    connectedUsers.set(socket.id, {
      user,
    });
  });

  // send notificatin to user that matches
  function sendNotification(room, notification) {
    connectedUsers.forEach((user, socketId) => {
      if (user.user === notification.currentChat) {
        socket.to(socketId).emit("notification", notification);
      }
    });
  }
  let currentRoom;
  // Join a room for one to one chat
  socket.on("join-chat", async (user, userName, currentChat) => {
    const found = await checkRoom(user, currentChat);
    socket.join(found.room);
    currentRoom = found.room;
    // console.log(connectedUsers);
  });
  socket.on("send-message", (data) => {
    io.to(currentRoom).emit("receive-message", data);
    sendNotification(currentRoom, data);
    // socket.to(currentRoom).emit("notification", data);
  });

  socket.on("delete-message", (room, chats) => {
    // console.log(room, chats);
    io.to(room).emit("update-message", chats);
  });

  // Join a room for Group chat
  socket.on("join-group", (data) => {
    socket.join(data);
    currentRoom = data;
    // console.log(connectedUsers);
  });
  socket.on("send-group-message", (data) => {
    io.to(currentRoom).emit("receive-group-message", data);
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.id);
    console.log("user disconnected");
  });
});

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", userRoute);
app.use("/api/", chatRoute);
app.use("/api/", groupRoute);
app.use("/api/", notificationRoute);

server.listen(4000, () => {
  console.log("server runing on port 4000");
});
