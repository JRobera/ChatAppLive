import Notification from "../models/notification.model.js";

const getNotification = async (req, res) => {
  const { userId } = req.params;
  try {
    const notification = await Notification.findOne({
      userId: userId,
    }).populate({ path: "notifications.senderId", sort: { $natural: -1 } });
    if (notification) {
      res.status(200).json({ data: notification });
    } else {
      const newNotification = await Notification.create({
        userId,
        notifications: [],
      });
      res.status(201).json({ data: newNotification });
    }
  } catch (error) {
    console.log(error);
  }
};
const addNotification = async (req, res) => {
  const { senderId, message, time, type, replyTo, currentChat } = req.body;
  try {
    const data = { senderId, message, time, type, replyTo };
    const updateNotification = await Notification.findOneAndUpdate(
      { userId: currentChat },
      { $push: { notifications: data } },
      { new: true }
    );
    // console.log(updateNotification);
  } catch (error) {
    console.log(error);
  }
};
const markAsReaden = async (req, res) => {
  const { id } = req.body;
  try {
    const updatedNotification = await Notification.updateOne(
      { "notifications._id": id },
      { $set: { "notifications.$.markasReaden": true } }
    );
    res.status(200).json("Marked as readen");
  } catch (error) {
    console.log(error);
  }
};
const deleteNotification = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteNotification = await Notification.findOneAndDelete({
      "notifications._id": id,
    });
    res.status(200).json("Notification deleted");
  } catch (error) {
    console.log(error);
  }
};

export { getNotification, addNotification, markAsReaden, deleteNotification };
