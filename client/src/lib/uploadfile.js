import axios from "axios";

const uploadChatImage = async (data) => {
  const res = await axios.post(
    "http://localhost:4000/api/upload/chat-image",
    data
  );
  return res.data.data;
};

const uploadChatAudio = async (data) => {
  const res = await axios.post(
    "http://localhost:4000/api/upload/chat-audio",
    data
  );
  return res.data.data;
};

export { uploadChatAudio, uploadChatImage };
