import checkRoom from "../lib/checkRoom.js";
import { removeFromCloudinary, uploadToCloudinary } from "../lib/cloudinary.js";
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
  try {
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
      res.status(201).json({ data: foundRoomChat.chats });
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
      res.status(201).json({ data: foundRoomChat.chats });
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
  try {
    const { room, _id } = req.body;
    const newchat = await Chat.findOneAndUpdate(
      { room: room },
      { $pull: { chats: { _id: _id } } }
    );
    const deleted = newchat.chats.filter((chat) => chat._id == _id);
    if (deleted[0]?.public_id)
      await removeFromCloudinary(deleted[0].public_id, "video");

    const updated = newchat.chats.filter((chat) => chat._id != _id);
    // console.log(deleted[0]);
    res.status(200).json(updated);
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
