"use client";

import React, { useState } from "react";
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

function ChannelCard({
  channel,
  refreshChannels,
}: {
  channel: { name: string; id: any; type: string };
  refreshChannels: () => void;
}) {
  const router = useRouter();
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
  return (
    <>
      <div
        className="w-full text-neutral-800 dark:text-neutral-400  text-sm flex flex-row items-center justify-between cursor-pointer group "
        onClick={() => {
          router.push(`/channel/${channel.id}`);
        }}
      >
        {channel.name}
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
