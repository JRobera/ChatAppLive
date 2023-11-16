// Send notification to users who are not online or not in the room
function sendNotification(room, notification) {
  connectedUsers.forEach((user, socketId) => {
    if (user.room === room && !user.online) {
      io.to(socketId).emit("notification", notification);
    }
  });
}

export default sendNotification;
