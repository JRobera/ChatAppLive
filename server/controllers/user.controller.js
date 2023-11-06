import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import checkRoom from "../lib/checkRoom.js";

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
            _id: response._id,
            fullName: response.fullName,
            profile: response.profile.img,
          })
        );
      });
    });
  } else {
    res.status(409).json({ message: "User already exists!" });
  }
};
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (result) {
        const user = {
          _id: foundUser._id,
          fullName: foundUser.fullName,
          profile: foundUser.profile.img,
        };
        res.status(202).json(user);
      } else {
        res.status(403).json("Incorrect password!");
      }
    });
  } else {
    res.status(404).json("User does not exist!");
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
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
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
                  res.status(200).json({ message: "Successfully updated" });
                }
              });
            }
          });
        } else {
          console.log("error p");
          res.status(403).json({ error: "Incorrect Password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getChats = async (req, res) => {
  const { id } = req.params;

  const chats = await User.find({ _id: { $ne: id } }).populate({
    path: "chats",
    // match: { room: checkedRoom },
  });

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

export { signUpUser, signInUser, updateUserName, changeUserPassword, getChats };
