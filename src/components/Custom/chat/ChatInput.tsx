"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useSocket } from "@/hooks/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ChatInput() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const theme = useTheme();
  const socket = useSocket();

  const channel = useSelector((store: RootState) => store.channel);

  const sendMessage = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);

        socket.emit("send-message", {
          channelId: channel.channelId,
          message: text,
          isPersonal: channel.isPersonal,
          file: uint8Array,
        });

        setText("");
        setOpen(false);
        setFile(null); // Reset the file state
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        // Optionally, reset input fields or show an error message
      };

      reader.readAsArrayBuffer(file);
    } else {
      socket.emit("send-message", {
        channelId: channel.channelId,
        message: text,
        isPersonal: channel.isPersonal,
      });
      setText("");
      setOpen(false);
    }
  };

  return (
    <div className="flex-col flex w-full">
      <div className="flex flex-row items-center bottom-0 dark:bg-neutral-900/70">
        <GrEmoji
          className="text-5xl p-3"
          onClick={() => setOpen(!open)}
        />
        <Textarea
          rows={1}
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter Message Here"
          className="grow resize-none focus-visible:ring-0 border-0 outline-none min-h-full text-base pt-3 dark:bg-neutral-900/70 focus-visible:ring-offset-0"
        />
        <div className="flex gap-1 items-center">
          <div className="relative hover:bg-neutral-800 duration-200 cursor-pointer transition-all">
            <input
              type="file"
              className="w-full h-full absolute opacity-0"
              accept=".jpg,.png,.jpeg,.gif,.webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <FaFileAlt className="text-5xl p-4" />
          </div>
          <IoSend
            className="text-5xl p-3 text-indigo-600"
            onClick={sendMessage}
          />
        </div>
      </div>
      {open && (
        <EmojiPicker
          autoFocusSearch={false}
          style={{ width: "100%", maxHeight: "40vh" }}
          onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
          // @ts-ignore
          theme={theme.resolvedTheme || "dark"}
        />
      )}
    </div>
  );
}

export default ChatInput;
