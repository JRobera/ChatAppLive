import { removeFromCloudinary, uploadToCloudinary } from "../lib/cloudinary.js";
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
        img: newGroupProfile?.url,
        public_id: newGroupProfile?.public_id,
      },
      members: admin,
    });
    res
      .status(201)
      .json({ data: newGroup, message: "Group Created Successfully" });
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
      res.status(400).json({ error: error });
    }
  }
};

const getGroups = async (req, res) => {
  const { _id } = req.params;
  try {
    const groups = await Group.find({
      $or: [{ public_group: true }, { members: { $in: [_id] } }],
    }).sort({ updatedAt: -1 });
    res.status(200).json({ data: groups });
  } catch (error) {
    res.json({ error: error });
  }
};

const addMessageToGroup = async (req, res) => {
  try {
    const { message, senderId, replyTo, time, currentChat, type, public_id } =
      req.body;
    if (!replyTo) {
      const foundGroup = await Group.findOneAndUpdate(
        { _id: currentChat },
        { $push: { chats: { message, time, senderId, type, public_id } } }
      );
      // console.log(foundGroup.chats);
      return res.status(201).json(foundGroup);
    } else {
      const foundGroup = await Group.findOneAndUpdate(
        { _id: currentChat },
        {
          $push: {
            chats: { message, time, senderId, replyTo, type, public_id },
          },
        }
      );
      return res.status(201).json(foundGroup.chats);
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
      { $pull: { chats: { _id: message_id } } }
    );
    const deleted = newchat.chats.filter((chat) => chat._id == message_id);
    if (deleted[0]?.public_id)
      await removeFromCloudinary(deleted[0].public_id, "video");

    const updated = newchat.chats.filter((chat) => chat._id != message_id);
    // console.log(deleted[0]);
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
  }
};

// update group name or profile Or Both
const updateGroupProfile = async (req, res) => {
  const { groupName, group_id } = req.body;
  try {
    if (req.file) {
      const newgroupProfile = await uploadToCloudinary(
        req.file.path,
        "group-profiles"
      );
      const oldGroupProfile = await Group.findOneAndUpdate(
        { _id: group_id },
        {
          $set: {
            groupName: groupName,
            "profile.img": newgroupProfile.url,
            "profile.public_id": newgroupProfile.public_id,
          },
        }
      );
      if (oldGroupProfile.profile?.public_id)
        await removeFromCloudinary(oldGroupProfile.profile.public_id, "video");

      const updatedGroup = await Group.findOne({ _id: group_id });

      res
        .status(200)
        .json({ data: updatedGroup, message: "Group Profile Updated" });
    } else {
      const updateGroup = await Group.findOneAndUpdate(
        { _id: group_id },
        { $set: { groupName: groupName } },
        { new: true }
      );
      res
        .status(200)
        .json({ data: updateGroup, message: "Group Name Updated" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const addMembersToGroup = async (req, res) => {
  const { id, group_id } = req.body;
  try {
    const foundUser = await Group.findOne({
      _id: group_id,
      members: { $in: [id] },
    });

    if (!foundUser) {
      const updateGroupMembers = await Group.findOneAndUpdate(
        { _id: group_id },
        { $push: { members: id } }
      );
      res.status(200).json({
        data: updateGroupMembers,
        message: "Member Added Successfully",
      });
    } else {
      res.status(409).json({ error: "User Is Already A Member" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
const removeMembersToGroup = async (req, res) => {
  const { id, group_id } = req.body;
  try {
    const foundUser = await Group.findOne({
      _id: group_id,
      members: { $in: [id] },
    });

    if (foundUser) {
      const updateGroupMembers = await Group.findOneAndUpdate(
        { _id: group_id },
        { $pull: { members: id } }
      );
      res.status(200).json({
        data: updateGroupMembers,
        message: "Member Removed Successfully",
      });
    } else {
      res.status(409).json({ error: "User Is Already Removed" });
    }
  } catch (error) {
    res.json({ error: error });
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
