import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, require: true },
    fullName: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    profile: {
      img: {
        type: String,
        default:
          "https://res.cloudinary.com/dbv6hao81/image/upload/v1692969059/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR_blqb4r.jpg",
      },
      public_id: { type: String },
    },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    // groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);
const User = model("user", UserSchema);

export default User;
