import React from "react";

const avatarStyle = {
  userProfile: "rounded-full w-7 h-7 object-cover",
  chatProfile: "rounded-full w-9 h-9 object-cover",
  changeProfile: "rounded-full w-14 h-14 object-cover",
};

export default function Avatar({ style, src }) {
  return <img className={avatarStyle[style]} src={src} alt="" />;
}
