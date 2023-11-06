import express from "express";
const chatRoute = express.Router();

import {
  addMessageToRoom,
  getMessageForRoom,
} from "../controllers/chat.controller.js";

chatRoute.get("/messages", getMessageForRoom);
chatRoute.post("/add/message", addMessageToRoom);

export default chatRoute;
