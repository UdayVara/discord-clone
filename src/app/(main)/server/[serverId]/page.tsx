"use client";
import ChatBody from "@/components/Custom/chat/ChatBody";
import ChatHeader from "@/components/Custom/chat/ChatHeader";
import ChatInput from "@/components/Custom/chat/ChatInput";
import VideoChatBody from "@/components/Custom/chat/ChatVideo";
import { useAuth } from "@/hooks/useAuth";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { serverId: string } }) {
  const selectedChannel = useSelector((store: RootState) => store.channel);
  console.debug("Channel Type",selectedChannel.type)
  const user = useAuth()

  const [start, setStart] = useState(false);
  return (
    <>
      <div className="w-full h-screen flex flex-col md:pb-0 pb-20">
        {selectedChannel.channelId && selectedChannel.channelId != "" ? (
          <>
            <ChatHeader />
            {
              selectedChannel.type == "video" || selectedChannel.type == "audio" ? <VideoChatBody setActive={setStart} active={start} name={user.username} room={selectedChannel.channelId} audio={true} video={selectedChannel.type == "video"}/> : <>
                <ChatBody />
                <ChatInput />
              </>
            }
            
            
          </>
        ) : (
          <>
            <ChatHeader />
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h4 className="text-lg">No Channel Exists</h4>
            </div>
          </>
        )}
      </div>
    </>
  );
}
