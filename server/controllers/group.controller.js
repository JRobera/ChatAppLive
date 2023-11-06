import Group from "../models/group.model.js";

const createGroup = async (req, res) => {
  const { groupName, admin } = req.body;
  const newGroup = Group.create({ groupName, admin });
  res.status(201).json("Group created!");
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};

const addMessageToGroup = async (req, res) => {
  const { message, senderId, time, currentChat, type } = req.body;
  try {
    const foundGroup = await Group.findOneAndUpdate(
      { _id: currentChat },
      { $push: { chats: { message, time, senderId, type } } }
    );
  } catch (error) {
    console.log(error);
  }
};

const getGroupChat = async (req, res) => {
  const { _id } = req.query;
  try {
    const foundGroupChat = await Group.findOne(
      { _id: _id },
      { chats: 1 }
    ).populate({ path: "chats.senderId", select: "_id fullName" });
    res.status(200).json(foundGroupChat);
  } catch (error) {
    console.log(error);
  }
};

export { createGroup, getGroups, addMessageToGroup, getGroupChat };
