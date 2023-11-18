import checkRoom from "../lib/checkRoom.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

const getMessageForRoom = async (req, res) => {
  const { user, currentChat } = req.query;
  const foundRoom = await checkRoom(user, currentChat);
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: user, chats: { $nin: [foundRoom._id] } },
      { $push: { chats: foundRoom._id } }
    );
    const foundRoomChat = await Chat.findOne({ room: foundRoom.room }).populate(
      { path: "chats.senderId", select: "_id fullName" }
    );
    res.status(200).json({ data: foundRoomChat });
  } catch (error) {
    res.json({ error: error });
  }
};

const addMessageToRoom = async (req, res) => {
  const {
    senderId,
    replyTo,
    message,
    time,
    user,
    currentChat,
    type,
    public_id,
  } = req.body;

  const foundRoom = await checkRoom(user, currentChat);
  // const chat = { message: message, time: time, senderId: senderId, type: type };
  try {
    if (!replyTo) {
      const foundRoomChat = await Chat.findOneAndUpdate(
        { room: foundRoom.room },
        {
          $push: {
            chats: { message, time, senderId, type, public_id },
          },
        },
        { new: true }
      );
      // console.log(foundRoomChat);
      res.status(200).json({ data: foundRoomChat.chats });
    } else {
      const foundRoomChat = await Chat.findOneAndUpdate(
        { room: foundRoom.room },
        {
          $push: {
            chats: { message, time, senderId, replyTo, type, public_id },
          },
        },
        { new: true }
      );
      // console.log(foundRoomChat);
      res.status(200).json({ data: foundRoomChat.chats });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const updateMessage = async (req, res) => {
  const { room, _id } = req.body;
  // const updatedChat = await Chat.findByIdAndUpdate({room:room},{})
};

const deleteMessage = async (req, res) => {
  const { room, _id } = req.body;
  try {
    const newchat = await Chat.findOneAndUpdate(
      { room: room },
      { $pull: { chats: { _id: _id } } },
      { new: true }
    );
    // console.log(newchat);
    res.status(200).json();
  } catch (error) {
    res.json({ error: error });
  }
};

const uploadImage = async (req, res) => {
  try {
    const uploadedImage = await uploadToCloudinary(
      req.file.path,
      "chat-message-image"
    );
    res.status(200).json({ data: uploadedImage });
  } catch (error) {
    res.json({ error: error });
  }
};
const uploadAudio = async (req, res) => {
  try {
    const uploadedAudio = await uploadToCloudinary(
      req.file.path,
      "chat-message-audio"
    );
    res.status(200).json({ data: uploadedAudio });
  } catch (error) {
    res.json({ error: error });
  }
};

export {
  getMessageForRoom,
  addMessageToRoom,
  deleteMessage,
  uploadAudio,
  uploadImage,
};
