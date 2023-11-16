import { Schema, model } from "mongoose";

const GroupSchema = new Schema(
  {
    groupName: { type: String },
    profile: {
      img: {
        type: String,
        default:
          "https://res.cloudinary.com/dbv6hao81/image/upload/v1700036390/group-profiles/fndctyxl403ecg6ubmtj.jpg",
      },
      public_id: { type: String },
    },
    admin: { type: Schema.Types.ObjectId, ref: "user" },
    chats: [
      {
        message: { type: String },
        time: { type: String },
        senderId: { type: Schema.Types.ObjectId, ref: "user" },
        replyTo: { name: { type: String }, message: { type: String } },
        type: { type: String },
      },
    ],
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    public_group: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Group = model("Group", GroupSchema);

export default Group;
