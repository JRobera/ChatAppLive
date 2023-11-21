import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsBorderAll } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import Setting from "./settingcomponents/Setting";

export default function SideBar() {
  const [showSetting, setShowSetting] = useState(false);
  const handleShowSetting = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <div className=" border-x-2 sm:h-full w-full pb-2 flex sm:w-16 sm:flex-col items-center gap-3 sm:pt-5">
      <span className=" font-bold hidden sm:inline-block sm:w-full text-center">
        Chat
      </span>
      <nav className="side-bar flex gap-6 sm:flex-col items-center justify-center w-full">
        <NavLink to="." end title="All">
          <BsBorderAll size={20} />
        </NavLink>
        <NavLink to="person" title="Person">
          <BsChatLeftText size={20} />
        </NavLink>
        <NavLink to="group" title="Groups">
          <HiOutlineUserGroup size={20} />
        </NavLink>

        <div
          className=" cursor-pointer"
          title="Settings"
          onClick={handleShowSetting}
        >
          <IoSettingsOutline size={20} />
        </div>
      </nav>
      {showSetting && <Setting handleShowSetting={handleShowSetting} />}
    </div>
  );
}
