"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ChatInput() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const theme: any = useTheme();
  const socket = useSocket();

  // const getError  = () => {
  //   socket.emit("get-error")
  // }

  const channel = useSelector((store: RootState) => store.channel);
  const sendMessage = async () => {
    socket.emit("send-message", {
      channelId: channel.channelId,
      message: text,
    });
    setText("")
    setOpen(false)
  };

   

  return (
    <>
      <div className="flex-col flex w-full">
        <div className="flex flex-row items-center     bottom-0 dark:bg-neutral-900/70">
          <GrEmoji
            className="text-5xl p-3    "
            onClick={() => {
              setOpen(!open);
            }}
          />
          <Textarea
            rows={1}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="Enter Message Here"
            className="grow resize-none focus-visible:ring-0 border-0 ouline-none min-h-full text-base pt-3  outline-none dark:bg-neutral-900/70 focus-visible:ring-offset-0"
          />
          <div className="flex gap-1 items-center">
            <div className="relative hover:bg-neutral-800 duration-200 cursor-pointer transition-all">
              <input
                type="file"
                name=""
                className="w-full h-full absolute opacity-0"
                id=""
              />
              <FaFileAlt className="text-5xl p-4    " />
            </div>
            <IoSend
              className="text-5xl p-3 text-indigo-600 "
              onClick={() => {
                sendMessage();
              }}
            />
          </div>
        </div>
        <EmojiPicker
          autoFocusSearch={false}
          style={{ width: "100% !important", maxHeight: "40vh !important" }}
          open={open}
          onEmojiClick={(emoji) => {
            setText(text + emoji.emoji);
          }}
          className={`${open ? "scale-100" : "scale-0"}`}
          theme={theme.resolvedTheme || "dark"}
        />
      </div>
    </>
  );
}

export default ChatInput;
