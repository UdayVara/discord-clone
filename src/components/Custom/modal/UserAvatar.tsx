"use client"
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { PiDotsThreeBold } from "react-icons/pi";

function UserAvatar() {
    const [role,setRole] = useState("guest")
  return (
    <div className="flex flex-row gap-2 w-full items-center">
      <div className="rounded-full w-9 flex items-center justify-center h-9 bg-purple-900 text-white">
        U
      </div>
      <div className="flex justify-between flex-row grow gap-3">
        <div className="flex flex-col grow">
          Uday vara
          <p>varaudayd@gmail.com</p>
        </div>
        <div>
          <DropdownMenu >
            <DropdownMenuTrigger >
              <PiDotsThreeBold className="mt-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right"  className="w-56 bg-slate-100 dark:bg-neutral-900/90">
              <DropdownMenuLabel>User Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={role}
                onValueChange={(value)=>{
                    setRole(value)
                }}
              >
                <DropdownMenuRadioItem value="guest">Guest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="moderator">Moderator</DropdownMenuRadioItem>
                
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
