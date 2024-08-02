"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateChannel from "../modal/CreateChannel";
import ChannelCard from "./ChannelCard";
import UserAvatar from "../modal/UserAvatar";
import { toast } from "sonner";
import { getChannels } from "@/actions/channel.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { userRoleType } from "@/redux/slices/serverSlice";
import { resetChannel, setChannel } from "@/redux/slices/channelSlice";

function ServerBody({
  members,
  fetchMembers,
  role,
}: {
  members: any[];
  fetchMembers: any;
  role: userRoleType;
}) {
  const [channelOpen, setChannelOpen] = useState(false);
  const [channels, setChannels] = useState<any>();
  const dispatch = useDispatch();
  const server = useSelector((root: RootState) => root.server);
  const fetchChannels = async () => {
    try {
      const res: any = await getChannels(server.selectedServer.id);
      // console.debug(res,"res")
      if (res.success) {
        setChannels(res.channels || { text: [], audio: [], video: [] });
        if (
          res.channels?.text?.length > 0 ||
          res.channels?.audio?.length > 0 ||
          res.channels?.video?.length > 0
        ) {
          dispatch(
            setChannel({
              channelId:
                res.channels.text[0]?.id ||
                res.channels.audio[0]?.id ||
                res.channels.video[0]?.id,
              name:
                res.channels.text[0]?.name ||
                res.channels.audio[0]?.name ||
                res.channels.video[0]?.name,
              type: res.channels[0]?.type,
              role: server.userRole,
              serverId: server.selectedServer.id,
            })
          );
        } else {
          dispatch(resetChannel());
        }
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    if (server.selectedServer.id != "") {
      fetchChannels();
    }
  }, [server.selectedServer.id]);

  // console.debug("Members", members);
  return (
    <>
      <div className="flex flex-col max-h-full overflow-y-auto pt-1 pb-40">
        {channels && channels.text && channels.text.length > 0 && (
          <>
            <div className="flex flex-row items-center justify-between">
              <h4 className="dark:text-neutral-400 text-neutral-950">
                Text Channels
              </h4>
              {role == userRoleType.moderator && (
                <FaPlus
                  className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                  onClick={() => {
                    setChannelOpen(true);
                  }}
                />
              )}
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
                    channel={{ name: item.name, id: item.id, type: item.type }}
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
              {role == userRoleType.moderator && (
                <FaPlus
                  className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                  onClick={() => {
                    setChannelOpen(true);
                  }}
                />
              )}
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
                    channel={{ name: item.name, id: item.id, type: item.type }}
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
              {role == userRoleType.moderator && (
                <FaPlus
                  className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
                  onClick={() => {
                    setChannelOpen(true);
                  }}
                />
              )}
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
                    channel={{ name: item.name, id: item.id, type: item.type }}
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
        {role == userRoleType.moderator && members.length > 0 && (
          <>
            <div className="flex flex-row items-center mt-3 justify-between">
              <h4 className="dark:text-neutral-400 text-neutral-950">
                Members
              </h4>
              {/* <FaPlus
            className="text-base text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={() => {
              setChannelOpen(true);
            }}
          /> */}
            </div>

            <div className="mt-2 px-1 text-sm  flex flex-col gap-4">
              {members.map((item, index) => {
                return (
                  <UserAvatar
                    key={index}
                    fetchMembers={fetchMembers}
                    name={item.users?.username}
                    id={item.id}
                    role={item.role}
                    email={item?.users?.email}
                    memberAccountId={item?.users?.id}
                    owner={item?.owner}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ServerBody;
