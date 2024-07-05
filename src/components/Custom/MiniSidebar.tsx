"use client"
import React, { useState } from 'react'
import { BsPlusLg } from "react-icons/bs";
import { ModeToggle } from './ModeToggler';
import CreateServer from './modal/CreateServer';
import ServerAvatar from './ServerAvatar';

function MiniSidebar() {
    const [open,setOpen]  = useState(false)
  return (
    <>
    <div className="w-14 h-screen overflow-y-hidden bg-neutral-100/70  flex-col items-center px-1 py-2 justify-between lg:flex hidden dark:bg-neutral-900 ">
        <div id="header-sidebar grow  gap-3 h-[80%]">
            <button className="dark:bg-neutral-700/45 dark:shadow-none shadow-md bg-neutral-100/90 border-2 block mx-auto  dark:border-none p-2 rounded-full" onClick={()=>{
                setOpen(true)
            }}><BsPlusLg className='text-xl text-emerald-600' /></button>
            <hr className='mt-3 border border-black dark:border-neutral-100'/>
            <div className='my-2  overflow-y-auto h-[80vh] '>
                <ServerAvatar serverImage='' serverTitle=''/>
                <ServerAvatar serverImage='' serverTitle=''/>
            
             
            </div>
        </div>
        <div id="footer-sidebar">
            <ModeToggle />
        </div>
    </div>

    <CreateServer open={open} setOpen={setOpen}/>
    </>
  )
}

export default MiniSidebar