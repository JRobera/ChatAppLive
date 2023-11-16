import express from "express";
const notificationRoute = express.Router();

import {
  addNotification,
  deleteNotification,
  getNotification,
  markAsReaden,
} from "../controllers/notification.controller.js";

notificationRoute.get("/get/notification/:userId", getNotification);
notificationRoute.post("/add/notification", addNotification);
notificationRoute.put("/mark-as-readen", markAsReaden);
notificationRoute.put("/delete/notification", deleteNotification);

export default notificationRoute;
