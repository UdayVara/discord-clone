"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

function ChatBody() {
  const channel = useSelector((store: RootState) => store.channel);
  return (
    <div className="chat-body  px-2 grow flex flex-col justify-end overflow-y-auto py-2">
      <h4 className="dark:text-neutral-300 text-neutral-800 text-2xl">
        # {channel.name}
      </h4>
      <h4 className="text-sm mt-1 dark:text-neutral-400 text-neutral-700">Start Conversation here by simply writing messages.</h4>
    </div>
  );
}

export default ChatBody;
