import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

// Routes
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import groupRoute from "./routes/group.route.js";

// Models
// import User from "./models/user.model.js";
// import Group from "./models/group.model.js";
// import Chat from "./models/chat.model.js";

import dbConnect from "./db/dbConnect.js";
import checkRoom from "./lib/checkRoom.js";

dbConnect();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  let currentRoom;
  // Join a room for one to one chat
  socket.on("join-chat", async (user, currentChat) => {
    const found = await checkRoom(user, currentChat);
    socket.join(found.room);
    currentRoom = found.room;
    console.log(found.room);
  });
  socket.on("send-message", (data) => {
    io.to(currentRoom).emit("receive-message", data);
  });

  // Join a room for Group chat
  socket.on("join-group", (data) => {
    socket.join(data);
    currentRoom = data;
  });
  socket.on("send-group-message", (data) => {
    io.to(currentRoom).emit("receive-group-message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", userRoute);
app.use("/api/", chatRoute);
app.use("/api/", groupRoute);

server.listen(4000, () => {
  console.log("server runing on port 4000");
});
