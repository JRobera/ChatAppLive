import express from "express";
const userRoute = express.Router();
import {
  signUpUser,
  signInUser,
  getChats,
  updateUserName,
  changeUserPassword,
} from "../controllers/user.controller.js";

// post requests
userRoute.post("/signup", signUpUser);
userRoute.post("/signin", signInUser);
userRoute.put("/update/user-name", updateUserName);
userRoute.put("/change/user-password", changeUserPassword);

// get requests
userRoute.get("/chats/:id", getChats);

export default userRoute;
