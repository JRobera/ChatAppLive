import { uploadToCloudinary } from "../lib/cloudinary.js";
import Group from "../models/group.model.js";

const createGroup = async (req, res) => {
  const { groupName, admin, group_type } = req.body;

  if (req.file) {
    const newGroupProfile = await uploadToCloudinary(
      req.file.path,
      "group-profiles"
    );
    const newGroup = await Group.create({
      groupName,
      admin,
      public_group: group_type,
      profile: {
        img: newGroupProfile.url,
        public_id: newGroupProfile.public_id,
      },
      members: admin,
    });
    res.status(201).json({ data: newGroup, message: "Group created!" });
  } else {
    try {
      const newGroup = await Group.create({
        groupName,
        admin,
        public_group: group_type,
        members: admin,
      });
      res.status(201).json({ data: newGroup, message: "Group created!" });
    } catch (error) {
      console.log(error);
    }
  }
};

const getGroups = async (req, res) => {
  const { _id } = req.params;
  try {
    const groups = await Group.find({
      $or: [{ public_group: true }, { members: { $in: [_id] } }],
    });
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};

const addMessageToGroup = async (req, res) => {
  const { message, senderId, replyTo, time, currentChat, type } = req.body;
  try {
    if (!replyTo) {
      const foundGroup = await Group.findOneAndUpdate(
        { _id: currentChat },
        { $push: { chats: { message, time, senderId, type } } }
      );
    } else {
      const foundGroup = await Group.findOneAndUpdate(
        { _id: currentChat },
        { $push: { chats: { message, time, senderId, replyTo, type } } }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getGroupChat = async (req, res) => {
  const { _id } = req.query;
  try {
    const foundGroupChat = await Group.findOne({ _id: _id }).populate({
      path: "chats.senderId",
      select: "_id fullName",
    });
    res.status(200).json(foundGroupChat);
  } catch (error) {
    console.log(error);
  }
};

const deleteGroupMessage = async (req, res) => {
  const { group_id, message_id } = req.body;
  try {
    const newchat = await Group.findOneAndUpdate(
      { _id: group_id },
      { $pull: { chats: { _id: message_id } } },
      { new: true }
    );
    // console.log(newchat);
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

// update group name or profile Or Both
const updateGroupProfile = async (req, res) => {
  const { groupName, group_id } = req.body;
  if (req.file) {
    const newgroupProfile = await uploadToCloudinary(
      req.file.path,
      "group-profiles"
    );
    const updateGroup = await Group.findOneAndUpdate(
      { _id: group_id },
      {
        $set: {
          groupName: groupName,
          "profile.img": newgroupProfile.url,
          "profile.public_id": newgroupProfile.public_id,
        },
      },
      { new: true }
    );
    res.status(200).json(updateGroup);
  } else {
    const updateGroup = await Group.findOneAndUpdate(
      { _id: group_id },
      { $set: { groupName: groupName } },
      { new: true }
    );
    res.status(200).json(updateGroup);
  }
};

const addMembersToGroup = async (req, res) => {
  const { id, group_id } = req.body;
  try {
    const updateGroupMembers = await Group.findOneAndUpdate(
      { _id: group_id },
      { $push: { members: id } }
    );
    res.status(200).json(updateGroupMembers);
  } catch (error) {
    console.log(error);
  }
};
const removeMembersToGroup = async (req, res) => {
  const { id, group_id } = req.body;
  try {
    const updateGroupMembers = await Group.findOneAndUpdate(
      { _id: group_id },
      { $pull: { members: id } }
    );
    res.status(200).json(updateGroupMembers);
  } catch (error) {
    console.log(error);
  }
};

export {
  createGroup,
  getGroups,
  addMessageToGroup,
  getGroupChat,
  deleteGroupMessage,
  updateGroupProfile,
  addMembersToGroup,
  removeMembersToGroup,
};
