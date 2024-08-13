"use client";

import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteChannels } from "@/actions/channel.action";
import EditChannel from "../modal/EditChannel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { userRoleType } from "@/redux/slices/serverSlice";
import { setChannel } from "@/redux/slices/channelSlice";
import { useSocket } from "@/hooks/useSocket";

function ChannelCard({
  channel,
  refreshChannels,
}: {
  channel: { name: string; id: any; type: string };
  refreshChannels: any;
}) {
  const router = useRouter();
  const socket = useSocket();
  const [isOpen, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await deleteChannels(channel.id);

      if (res.success) {
        refreshChannels();
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const selectedChannel = useSelector((store:RootState)=>store.channel)

  useEffect(() => {
    if (channel.id != "" && !selectedChannel.isPersonal && socket) {
      socket.emit("join", {
        channelId: selectedChannel.channelId,
      });
    }
  }, [selectedChannel.channelId]);

  const server = useSelector((root: RootState) => root.server);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="w-full text-neutral-800 dark:text-neutral-400  text-sm flex flex-row items-center justify-between cursor-pointer group "
        onClick={() => {
          dispatch(
            setChannel({
              channelId: channel.id,
              name: channel.name,
              role: server.userRole,
              serverId: server.selectedServer.id,
              type: channel.type,
              isPersonal:false
            })
          );
        }}
      >
        {channel.name}
        {server.userRole == userRoleType.moderator && (
          <div className="hidden group-hover:flex transition-all flex-row gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MdEdit
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    <MdDelete />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      <EditChannel
        refreshChannels={refreshChannels}
        isOpen={isOpen}
        setOpen={setOpen}
        id={channel.id}
        name={channel.name}
        type={channel.type}
      />
    </>
  );
}

export default ChannelCard;
