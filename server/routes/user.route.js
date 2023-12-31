import express from "express";
const userRoute = express.Router();
import {
  signUpUser,
  signInUser,
  getChats,
  updateUserName,
  changeUserPassword,
  changeUserProfile,
  refreshToken,
  logOut,
} from "../controllers/user.controller.js";
import upload from "../middleware/uploader.js";
import verifyJWT from "../middleware/verifyJWT.js";

// post requests
userRoute.post("/signup", signUpUser);
userRoute.post("/signin", signInUser);
userRoute.post("/logout", logOut);
userRoute.post("/refresh-token", refreshToken);
userRoute.put("/update/user-name", updateUserName);
userRoute.put("/change/user-password", changeUserPassword);
userRoute.put(
  "/change/user-profile",
  [upload.single("user-profile")],
  changeUserProfile
);

// get requests
userRoute.get("/chats/:id", getChats);

export default userRoute;
