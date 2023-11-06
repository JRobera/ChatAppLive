import Chat from "../models/chat.model.js";

async function checkRoom(user, currentChat) {
  let tempRoom = user + "-" + currentChat;
  const foundRoom = await Chat.findOne({ room: tempRoom });
  if (foundRoom) {
    // console.log("first room");
    return foundRoom;
  } else {
    tempRoom = currentChat + "-" + user;
    const reversRoom = await Chat.findOne({ room: tempRoom });
    if (reversRoom) {
      //   console.log("revers room");
      return reversRoom;
    } else {
      //   console.log("new room");
      const newRoom = await Chat.create({ room: user + "-" + currentChat });
      return newRoom;
    }
  }
}
export default checkRoom;
