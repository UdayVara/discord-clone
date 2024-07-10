"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateChannel from "../modal/CreateChannel";
import ChannelCard from "./ChannelCard";
import UserAvatar from "../modal/UserAvatar";
import { toast } from "sonner";
import { getChannels } from "@/actions/channel.action";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ServerBody() {
  const [channelOpen, setChannelOpen] = useState(false);
  const [channels, setChannels] = useState<any>();
  const server = useSelector((root: RootState) => root.server).selectedServer;
  const fetchChannels = async () => {
    try {
      const res = await getChannels(server.id);

      if (res.success) {
        setChannels(res.channels || { text: [], audio: [], video: [] });
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    if (server.id != "") {
      fetchChannels();
    }
  }, [server.id]);
  return (
    <>
      <div className="flex flex-col max-h-full overflow-y-auto pt-1 pb-40">
        {channels && channels.text && channels.text.length > 0 && (
          <>
            <div className="flex flex-row items-center justify-between">
              <h4 className="dark:text-neutral-400 text-neutral-950">
                Text Channels
              </h4>
              <FaPlus
                className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                onClick={() => {
                  setChannelOpen(true);
                }}
              />
            </div>

            <CreateChannel
              refreshChannels={fetchChannels}
              open={channelOpen}
              setOpen={setChannelOpen}
            />

            <div className="mt-2 px-1  flex flex-col gap-2">
              {channels.text.map((item: any, index: any) => {
                return (
                  <ChannelCard
                    refreshChannels={fetchChannels}
                    key={index}
                    channel={{ name: item.name, id: item.id,type:item.type }}
                  />
                );
              })}
            </div>
          </>
        )}

        {channels && channels.audio && channels.audio.length > 0 && (
          <>
            <div className="flex mt-3 flex-row items-center justify-between">
              <h4 className="dark:text-neutral-400 text-neutral-950">
                Audio Channels
              </h4>
              <FaPlus
                className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                onClick={() => {
                  setChannelOpen(true);
                }}
              />
            </div>

            <CreateChannel
              refreshChannels={fetchChannels}
              open={channelOpen}
              setOpen={setChannelOpen}
            />

            <div className="mt-2 px-1  flex flex-col gap-2">
              {channels.audio.map((item: any, index: any) => {
                return (
                  <ChannelCard
                    refreshChannels={fetchChannels}
                    key={index}
                    channel={{ name: item.name, id: item.id,type:item.type }}
                  />
                );
              })}
            </div>
          </>
        )}
        {channels && channels.video && channels.video.length > 0 && (
          <>
            <div className="flex mt-3 flex-row items-center justify-between">
              <h4 className="dark:text-neutral-400 text-neutral-950">
                Video Channels
              </h4>
              <FaPlus
                className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                onClick={() => {
                  setChannelOpen(true);
                }}
              />
            </div>

            <CreateChannel
              refreshChannels={fetchChannels}
              open={channelOpen}
              setOpen={setChannelOpen}
            />

            <div className="mt-2 px-1  flex flex-col gap-2">
              {channels.video.map((item: any, index: any) => {
                return (
                  <ChannelCard
                    refreshChannels={fetchChannels}
                    key={index}
                    channel={{ name: item.name, id: item.id ,type:item.type}}
                  />
                );
              })}
            </div>
          </>
        )}
        {/* <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">
            Audio Channels
          </h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div> */}

        {/* <CreateChannel open={channelOpen} setOpen={setChannelOpen} /> */}

        {/* <div className="mt-2 px-1  flex flex-col gap-2">
          {[11, 22].map((item, index) => {
            return (
              <ChannelCard
                key={index}
                channel={{ name: `# Channel ${item}`, id: item }}
              />
            );
          })}
        </div> */}
        {/* <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">
            Video Channels
          </h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div> */}
        {/* 
        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1  flex flex-col gap-2">
          {[111, 222].map((item, index) => {
            return (
              <ChannelCard
                key={index}
                channel={{ name: `# Channel ${item}`, id: item }}
              />
            );
          })}
        </div> */}
        {/* <div className="flex flex-row items-center mt-3 justify-between">
          <h4 className="dark:text-neutral-400 text-neutral-950">Members</h4>
          <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          />
        </div>

        <CreateChannel open={channelOpen} setOpen={setChannelOpen} />

        <div className="mt-2 px-1 text-sm  flex flex-col gap-4">
          {[111, 222, 333, 4444, 5555].map((item, index) => {
            return <UserAvatar key={index} />;
          })}
        </div> */}
      </div>
    </>
  );
}

export default ServerBody;
