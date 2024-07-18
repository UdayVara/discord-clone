"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
function ChatInput() {
  return (
    <>
      <div className="flex flex-row      bottom-0 dark:bg-neutral-900/70">
        <GrEmoji className="text-5xl p-3    " />
        <Textarea
          rows={1}
          placeholder="Enter Message Here"
          className="grow resize-none focus-visible:ring-0 border-0 ouline-none    outline-none dark:bg-neutral-900/70 focus-visible:ring-offset-0"
        />
        <div className="flex gap-1 items-center">
          <FaFileAlt className="text-5xl p-4    " />
          <IoSend className="text-5xl p-3 text-indigo-600 " />
        </div>
      </div>
    </>
  );
}

export default ChatInput;
