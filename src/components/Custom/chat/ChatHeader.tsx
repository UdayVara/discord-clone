"use client";
import { useSocket } from "@/hooks/useSocket";
import { RootState } from "@/redux/store";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

function ChatHeader() {
  const channel = useSelector((root: RootState) => root.channel);

  const socket = useSocket();
  console.log(socket.connected);
  return (
    <>
      <div className="w-full flex-row border-b-2 py-2 px-2 flex justify-between items-center">
        <div className="flex items-center gap-3 dark:text-neutral-300 text-neutral-700">
          <GiHamburgerMenu /># {channel.name}
        </div>
        {socket && socket.connected ? (
          <span>Connnected</span>
        ) : (
          <span>Not Connected</span>
        )}
      </div>
    </>
  );
}

export default ChatHeader;
