import api from "../axios";

const uploadChatImage = async (data) => {
  const res = await api.post("/api/upload/chat-image", data);
  return res.data.data;
};

const uploadChatAudio = async (data) => {
  const res = await api.post("/api/upload/chat-audio", data);
  return res.data.data;
};

export { uploadChatAudio, uploadChatImage };
