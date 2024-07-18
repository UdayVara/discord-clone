"use client";
import ChatHeader from "@/components/Custom/chat/ChatHeader";
import ChatInput from "@/components/Custom/chat/ChatInput";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { channel: string } }) {
  const selectedChannel = useSelector((store: RootState) => store.channel);
  return (
    <>
      <div className="w-full h-screen flex flex-col md:pb-0 pb-6">
        {selectedChannel.channelId && selectedChannel.channelId != "" ? (
          <>
            <ChatHeader />
            <div className="chat-body grow">
              Chats here
            </div>
            <ChatInput />
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
