import { Schema, model } from "mongoose";

const notificationSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    notifications: [
      {
        message: { type: String },
        time: { type: String },
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        replyTo: { name: { type: String }, message: { type: String } },
        type: { type: String },
        markasReaden: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const notification = model("Notification", notificationSchema);

export default notification;
