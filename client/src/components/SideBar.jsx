import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsBorderAll } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import Setting from "./settingcomponents/Setting";
import OverLay from "./OverLay";

export default function SideBar() {
  const [showSetting, setShowSetting] = useState(false);
  const handleShowSetting = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <div className=" border-x-2 sm:h-full w-full pb-2 flex sm:w-16 sm:flex-col items-center gap-3 sm:pt-5">
      <span className=" font-bold hidden sm:w-full text-center sm:flex items-center gap-1">
        Chat
        <IoChatboxEllipsesOutline size={15} />
      </span>

      <hr className="hidden sm:block w-11/12 bg-mbg-active h-[2px]" />

      <nav className="side-bar flex gap-6 sm:flex-col items-center justify-center w-full">
        {/* Working on it */}
        {/* <NavLink to="." end title="All">
          <BsBorderAll size={20} />
        </NavLink> */}
        <NavLink to="person" title="Person">
          <BsChatLeftText size={20} />
        </NavLink>
        <NavLink to="group" title="Groups">
          <HiOutlineUserGroup size={20} />
        </NavLink>

        <hr className="hidden sm:block w-11/12 bg-mbg-active h-[2px]" />

        <div
          className=" cursor-pointer rounded "
          title="Settings"
          onClick={handleShowSetting}
        >
          <IoSettingsOutline size={20} />
        </div>
      </nav>
      {showSetting && (
        <OverLay handleOverLayClick={handleShowSetting}>
          <Setting handleShowSetting={handleShowSetting} />
        </OverLay>
      )}
    </div>
  );
}
