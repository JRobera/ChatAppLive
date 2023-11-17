import express from "express";
const chatRoute = express.Router();

import {
  addMessageToRoom,
  deleteMessage,
  getMessageForRoom,
  uploadAudio,
  uploadImage,
} from "../controllers/chat.controller.js";
import upload from "../middleware/uploader.js";

chatRoute.get("/messages", getMessageForRoom);
chatRoute.post("/add/message", addMessageToRoom);
chatRoute.put("/delete/message", deleteMessage);

chatRoute.post("/upload/chat-audio", upload.single("chat-audio"), uploadAudio);
chatRoute.post("/upload/chat-image", upload.single("chat-image"), uploadImage);

export default chatRoute;
