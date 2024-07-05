"use client"
import React from 'react'
import { IoMdSearch } from "react-icons/io";

function SearchBox() {
  return (
    <>
    <div className="flex rounded mt-2 flex-row items-center gap-1 dark:bg-neutral-700/40 opacity-85  bg-slate-100/80  ">
        <IoMdSearch className='text-xl mx-2 '/>
        <input type="text" className='py-2 w-full focus:outline-none focus:border-none bg-transparent ' placeholder='Search'/>
    </div>
    <div className="border-b border-b-neutral-500 my-4"></div>
    </>
  )
}

export default SearchBox