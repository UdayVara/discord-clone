"use client";
import ChatHeader from "@/components/Custom/chat/ChatHeader";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { channel: string } }) {
  const selectedChannel = useSelector((store: RootState) => store.channel);
  return (
    <>
      <div className="w-full h-full">
        {selectedChannel.channelId && selectedChannel.channelId != "" ? (
          <>
            <ChatHeader />
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
