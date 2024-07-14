"use client";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import SearchModal from "../modal/SearchModal";

function SearchBox() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="flex rounded mt-2 flex-row items-center gap-3 dark:bg-neutral-700/40 opacity-85  bg-slate-100/80 cursor-pointer  "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IoMdSearch className="text-xl ms-2 " />
        <div className="w-full py-2  bg-transparent text-sm dark:text-neutral-400 text-neutral-700">Search</div>
      </div>
      <div className="border-b border-b-neutral-500 my-4"></div>

      <SearchModal open={open} setOpen={setOpen} />
    </>
  );
}

export default SearchBox;
