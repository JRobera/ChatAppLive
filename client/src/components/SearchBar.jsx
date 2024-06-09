import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ list, handleFilteredUsers }) {
  const [filterUser, setFilterUser] = useState("");
  // console.log(list);

  useEffect(() => {
    if (filterUser !== "") {
      const result = list?.filter((user) => {
        return (
          user?.fullName?.toLowerCase().includes(filterUser?.toLowerCase()) ||
          user?.groupName?.toLowerCase().includes(filterUser?.toLowerCase())
        );
      });

      handleFilteredUsers(result);
      // console.log(result);
    } else {
      handleFilteredUsers(list);
      // console.log(list);
    } //
  }, [filterUser]);

  return (
    <div className=" mx-2 mb-2 flex gap-1 border-2 rounded-md justify-center items-center bg-white">
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
