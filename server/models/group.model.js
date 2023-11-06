import { Schema, model } from "mongoose";

const GroupSchema = new Schema(
  {
    groupName: { type: String },
    profile: {
      img: {
        type: String,
        default:
          "https://res.cloudinary.com/dbv6hao81/image/upload/v1692969059/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR_blqb4r.jpg",
      },
      public_id: { type: String },
    },
    admin: { type: Schema.Types.ObjectId, ref: "user" },
    chats: [
      {
        message: { type: String },
        time: { type: String },
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        type: { type: String },
      },
    ],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Group = model("Group", GroupSchema);

export default Group;
