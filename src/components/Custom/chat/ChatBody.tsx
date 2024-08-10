"use client";
import { getChats } from "@/actions/channel.action";
import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { format } from "date-fns";
import { useSocket } from "@/hooks/useSocket";
import Image from "next/image";
function ChatBody() {
  const channel = useSelector((store: RootState) => store.channel);
  const [chats, setChats] = useState<any[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const socket = useSocket();

  useEffect(() => {
    socket.on("recieve-message", (message) => {
      console.debug("New Message Received");
      setChats((chats) => [...chats, message]);
    });

    socket.on("new-notification",(notification)=>{
      console.debug("notification Recieved")
      if(notification?.success){
        toast.success(notification?.message)
      }else{
        toast.error(notification?.message)
      }
      
    })
  }, []);

  const fetchChats = async () => {
    try {
      const res = await getChats(channel.channelId,channel.isPersonal);

      if (res.success) {
        setChats(res.chats);
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    if (channel.channelId) {
      fetchChats();  
    }
  }, [channel.channelId]);

  useEffect(() => {
    // @ts-ignore
    chatContainer.current.scrollTop = chatContainer.current?.scrollHeight || 0;
  }, [chats]);
  return (
    <div
      ref={chatContainer}
      className={`chat-body max-h-full  px-2 grow flex flex-col  overflow-y-scroll py-4 ${chats && chats.length < 12 ?  "justify-end" : ""}`}
    >
      <h4 className="dark:text-neutral-300 text-neutral-800 text-2xl">
        # {channel.name}
      </h4>
      <h4 className="text-sm mt-1 dark:text-neutral-400 text-neutral-700 pb-2">
        Start Conversation here by simply writing messages.
      </h4>

      <div className="mt-3 flex flex-col gap-3">
        {chats &&
          chats.length > 0 &&
          chats.map((chat, index) => {
            return (
              <div key={index} className={`flex flex-row items-start gap-2 ${chat.fileurl?"items-end":"items-start"}`}>
                <div className="rounded-full w-7 flex items-center justify-center h-7 bg-purple-900 text-white text-xs mt-3">
                  {chat?.user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h1 className=" text-[11px]  dark:text-neutral-300">
                    {chat?.user?.username} |{" "}
                    {format(chat?.created_at, "dd-MM-yyyy HH:mm:ss")}
                  </h1>

                  {
                    chat.fileurl && <Image src={chat.fileurl} width={1000} height={1000} alt="Failed To Load" className="rounded md-w-[70%] w-[99%] max-w-[300px] md-mx-0 mx-auto object-contain h-auto  p-5" />
                  }
                  <span className="dark:text-neutral-200 text-neutral-800">
                    {chat?.message}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatBody;
