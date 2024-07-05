"use client";

import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

function ChannelCard({ channel }: { channel: { name: string,id:any } }) {
  const router = useRouter()
  return (
    <>
      <div className="w-full text-neutral-800 dark:text-neutral-400  text-sm flex flex-row items-center justify-between cursor-pointer group " onClick={()=>{
        router.push(`/channel/${channel.id}`)
      }}>
        {channel.name}
        <div className="hidden group-hover:flex transition-all flex-row gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdEdit />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdDelete />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}

export default ChannelCard;
