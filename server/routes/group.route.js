import express from "express";
const groupRoute = express.Router();

import {
  addMembersToGroup,
  addMessageToGroup,
  createGroup,
  deleteGroupMessage,
  getGroupChat,
  getGroups,
  removeMembersToGroup,
  updateGroupProfile,
} from "../controllers/group.controller.js";
import upload from "../middleware/uploader.js";

// post requiests
groupRoute.post("/create-group", upload.single("groupProfile"), createGroup);
groupRoute.post("/add-group/message", addMessageToGroup);
groupRoute.put("/delete/group/message", deleteGroupMessage);
groupRoute.put(
  "/update-group/profile",
  upload.single("group_profile"),
  updateGroupProfile
);
groupRoute.put("/add-group/member", addMembersToGroup);
groupRoute.put("/delete-group/member", removeMembersToGroup);

// get requiests
groupRoute.get("/get-groups/:_id", getGroups);
groupRoute.get("/get-group/chat", getGroupChat);

export default groupRoute;
