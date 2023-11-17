import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    room: { type: String },
    chats: [
      {
        message: { type: String },
        time: { type: String },
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        replyTo: { name: { type: String }, message: { type: String } },
        type: { type: String },
        public_id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Chat = model("Chat", ChatSchema);
export default Chat;
