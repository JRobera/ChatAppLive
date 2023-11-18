import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import checkRoom from "../lib/checkRoom.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        User.create({
          firstName,
          lastName,
          fullName: firstName + " " + lastName,
          email,
          password: hash,
        }).then((response) =>
          res.status(201).json({
            data: {
              _id: response._id,
              fullName: response.fullName,
              profile: response.profile.img,
            },
            message: "User Successfuly Registerd",
          })
        );
      });
    });
  } else {
    res.status(409).json({ error: "User already exists!" });
  }
};
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result) {
          const user = {
            _id: foundUser._id,
            fullName: foundUser.fullName,
            profile: foundUser.profile.img,
          };
          res
            .status(202)
            .json({ data: user, message: "Successfully Logged in" });
        } else {
          res.status(403).json({ error: "Incorrect password!" });
        }
      });
    } else {
      res.status(404).json({ error: "User does not exist!" });
    }
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
};

const updateUserName = async (req, res) => {
  const { _id, newName } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: _id },
      { fullName: newName }
    );
    if (foundUser) {
      const user = {
        _id: foundUser._id,
        fullName: newName,
        profile: foundUser.profile.img,
      };
      res
        .status(200)
        .json({ data: user, message: "User Name Successfully Updated" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
const changeUserPassword = async (req, res) => {
  const { _id, oldPassword, newPassword } = req.body;
  try {
    const foundUser = await User.findOne({ _id: _id });
    if (foundUser) {
      bcrypt.compare(oldPassword, foundUser?.password, (err, result) => {
        if (result) {
          bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
              bcrypt.hash(newPassword, salt, async (err, hash) => {
                if (!err) {
                  const updateUser = await User.findOneAndUpdate(
                    { _id: _id },
                    { password: hash }
                  );
                  res
                    .status(200)
                    .json({ message: "Password Successfully updated" });
                }
              });
            }
          });
        } else {
          res.status(403).json({ error: "Incorrect Password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const changeUserProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const profileImg = await uploadToCloudinary(req.file.path, "chat-user");
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "profile.img": profileImg.url,
          "profile.public_id": profileImg.public_id,
        },
      },
      { new: true }
    );
    const user = {
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      profile: updatedUser.profile.img,
    };
    res
      .status(200)
      .json({ data: user, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

const getChats = async (req, res) => {
  const { id } = req.params;

  const chats = await User.find({ _id: { $ne: id } })
    .populate({
      path: "chats",
      // match: { room: checkedRoom },
    })
    .sort({ updatedAt: -1 });

  for (const chat of chats) {
    // console.log(chat.chats);
    const checkedRoom = await checkRoom(id, chat._id);

    const newc = chat.chats.filter((c) => c.room === checkedRoom.room);
    chat.chats = newc;
  }
  if (chats) {
    res.status(200).json(chats);
  } else {
    res.status(404).json("no chat found!");
  }
};

export {
  signUpUser,
  signInUser,
  updateUserName,
  changeUserPassword,
  changeUserProfile,
  getChats,
};
