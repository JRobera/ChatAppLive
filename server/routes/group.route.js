import express from "express";
const groupRoute = express.Router();

import {
  addMessageToGroup,
  createGroup,
  getGroupChat,
  getGroups,
} from "../controllers/group.controller.js";

// post requiests
groupRoute.post("/create-group", createGroup);
groupRoute.post("/add-group/message", addMessageToGroup);

// get requiests
groupRoute.get("/get-groups", getGroups);
groupRoute.get("/get-group/chat", getGroupChat);

export default groupRoute;
