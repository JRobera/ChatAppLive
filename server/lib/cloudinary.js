import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      resource_type: "auto",
      folder,
    })
    .then((data) => {
      return {
        url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadAudioToCloudinary = async (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      resource_type: "auto",
      folder,
    })
    .then((data) => {
      return {
        url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

const removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
    console.log(result, error);
  });
};

export { uploadToCloudinary, uploadAudioToCloudinary, removeFromCloudinary };
