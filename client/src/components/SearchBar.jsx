import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  const [filterUser, setFilterUser] = useState();

  return (
    <div className=" mx-2 mb-3 flex gap-1 border-2 rounded-md justify-center items-center ">
      <CiSearch size={20} />
      <input
        className=" w-full rounded-md p-1 focus:border-none focus:outline-none "
        type="search"
        placeholder="Search"
        onChange={(e) => {
          setFilterUser(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(e.target.value);
          }
        }}
      />
    </div>
  );
}
