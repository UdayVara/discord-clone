"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateChannel from "../modal/CreateChannel";
import ChannelCard from "./ChannelCard";
import UserAvatar from "../modal/UserAvatar";

function ServerBody() {
  const [channelOpen, setChannelOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col max-h-full overflow-y-auto pt-1 pb-4">
        <div className="flex flex-row items-center justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">Text Channels</h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div>

        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1  flex flex-col gap-2">
          {[
            1, 2,3,4,5,6,7,8,9,10,11,12,13
          ].map((item, index) => {
            return (
              <ChannelCard
                key={index}
                channel={{ name: `# Channel ${item}`,id:item }}
              />
            );
          })}
        </div>
        <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">Audio Channels</h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div>

        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1  flex flex-col gap-2">
          {[
            11, 22
          ].map((item, index) => {
            return (
              <ChannelCard
                key={index}
                channel={{ name: `# Channel ${item}` ,id:item}}
              />
            );
          })}
        </div>
        <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">Video Channels</h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div>

        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1  flex flex-col gap-2">
          {[
            111, 222
          ].map((item, index) => {
            return (
              <ChannelCard
                key={index}
                channel={{ name: `# Channel ${item}` ,id:item}}
              />
            );
          })}
        </div>
        <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">Members</h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div>

        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1 text-sm  flex flex-col gap-2">
          {[
            111, 222
          ].map((item, index) => {
            return (
              <UserAvatar key={index}/>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ServerBody;
