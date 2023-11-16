import express from "express";
const chatRoute = express.Router();

import {
  addMessageToRoom,
  deleteMessage,
  getMessageForRoom,
} from "../controllers/chat.controller.js";

chatRoute.get("/messages", getMessageForRoom);
chatRoute.post("/add/message", addMessageToRoom);
chatRoute.put("/delete/message", deleteMessage);

export default chatRoute;
