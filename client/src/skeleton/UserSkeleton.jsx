import React from "react";
import "./skeleton.css";

export default function UserSkeleton() {
  return (
    <div className="skeleton  cursor-pointer flex-shrink-0 w-28 sm:w-full flex flex-col sm:flex-row gap-2 items-center p-2">
      <div className="skeleton-img rounded-full w-9 h-9"></div>
      <div className="sm:flex-1 w-full">
        <div className=" flex gap-1 justify-between flex-col sm:flex-row">
          <p className="skeleton-name"></p>
          <p className="skeleton-name"></p>
        </div>
        <div className="skeleton-message text-md text-xs mt-1"></div>
      </div>
    </div>
  );
}
