"use client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MdExpandMore } from "react-icons/md";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import InviteFriends from "../modal/InviteFriends";
import ManageMembers from "../modal/ManageMembers";
import CreateChannel from "../modal/CreateChannel";
import { CiLogout } from "react-icons/ci";
import LeaveServer from "../modal/LeaveServer";
import SearchBox from "./SearchBox";
import ServerBody from "./ServerBody";
import { useParams } from "next/navigation";


function ServerSidebar() {
  const [inviteOpen,setInviteOpen] = useState(false)
  const [manageOpen,setManageOpen] = useState(false)
  const [channelOpen,setChannelOpen] = useState(false)
  const [logoutOpen,setLogoutOpen] = useState(false)
  const params = useParams()

  console.debug("Params",params.channel)
  return (
    <>
      <div className={`min-w-44 ${params && params.channel ? "md:flex hidden":"md:w-auto w-full "}  h-full flex-col  dark:bg-neutral-900/40  bg-slate-200/50 px-3`}>
        <DropdownMenu >
          <DropdownMenuTrigger className="w-full items-center flex justify-between text-base py-2 ">Code With Uday <MdExpandMore className="text-lg"/></DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 dark:bg-neutral-950">
            <DropdownMenuItem className="flex items-center justify-between" onClick={()=>{
              setInviteOpen(true)
            }}>Invite People <FaUserPlus className="text-md"/></DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">Server Settings <IoSettings className="text-md " /></DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between" onClick={()=>{
              setManageOpen(true)
            }}>Manage Members <MdManageAccounts className="text-md" /></DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between" onClick={()=>{
              setChannelOpen(true)
            }}>Create Channel <MdCreateNewFolder  className="text-md"/></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between text-rose-600" onClick={()=>{
              setLogoutOpen(true)
            }}>Leave Server <CiLogout className="text-md" /></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <SearchBox />
          <ServerBody />
      </div>

      <InviteFriends open={inviteOpen} setOpen={setInviteOpen}/>
      <ManageMembers open={manageOpen} setOpen={setManageOpen}/>
      <CreateChannel open={channelOpen} setOpen={setChannelOpen}/>
      <LeaveServer open={logoutOpen} setOpen={setLogoutOpen} />
    </>
  );
}

export default ServerSidebar;
