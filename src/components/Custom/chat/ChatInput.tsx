"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
function ChatInput() {
  return (
    <>
      <div className="flex flex-row      bottom-0 dark:bg-neutral-900/70">
        <FaFileAlt className="text-5xl p-4    " />
        <Textarea 
          placeholder="Enter Message Here"
          className="grow focus-visible:ring-0 border-0 ouline-none    outline-none dark:bg-neutral-900/70 h-2 focus-visible:ring-offset-0"
        />
        <IoSend className="text-5xl p-3 text-indigo-600 " />
      </div>
    </>
  );
}

export default ChatInput;
