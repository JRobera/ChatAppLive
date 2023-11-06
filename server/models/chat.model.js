import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    room: { type: String },
    chats: [
      {
        message: { type: String },
        time: { type: String },
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        type: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Chat = model("Chat", ChatSchema);
export default Chat;
