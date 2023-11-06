import checkRoom from "../lib/checkRoom.js";
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
    res.status(200).json(foundRoomChat);
  } catch (error) {
    console.log(error);
  }
};

const addMessageToRoom = async (req, res) => {
  const { senderId, message, time, user, currentChat, type } = req.body;

  const foundRoom = await checkRoom(user, currentChat);
  console.log(foundRoom.room);
  // const chat = { message: message, time: time, senderId: senderId, type: type };
  try {
    const foundRoomChat = await Chat.findOneAndUpdate(
      { room: foundRoom.room },
      { $push: { chats: { message, time, senderId, type } } }
    );
  } catch (error) {
    console.log(error);
  }
};

export { getMessageForRoom, addMessageToRoom };
