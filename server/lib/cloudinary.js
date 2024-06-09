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

const removeFromCloudinary = async (public_id, type) => {
  await cloudinary.v2.uploader.destroy(
    public_id,
    { resource_type: type },
    function (error, _result) {
      if (error) {
        console.log(error);
      } else {
        console.log("Deleted successfuly");
      }
    }
  );
};

export { uploadToCloudinary, uploadAudioToCloudinary, removeFromCloudinary };
