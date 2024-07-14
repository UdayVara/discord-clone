"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SingleDropZone } from "@/components/Dropzone/File-Dropzone";
import { Button } from "@/components/ui/button";
import { IoCopy } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { getServers, leaveServer } from "@/actions/Server.action";
import { selectServer, setServers } from "@/redux/slices/serverSlice";
import { Input } from "@/components/ui/input";
import { searchChannelsMembers } from "@/actions/channel.action";
import ChannelCard from "../ServerSidebar/ChannelCard";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/hooks/useAuth";

function SearchModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const [channels, setChannels] = useState<any>({ text: [], audio: [], video: [] });
  const [members, setMembers] = useState([]);
  const selectedServer = useSelector((root: RootState) => root.server);

  const fetchData = async (query: string) => {
    console.debug("Fetch Data Called");
    const res = await searchChannelsMembers(
      selectedServer.selectedServer.id,
      query
    );
    // console.debug("search response", res);
    if (res.success) {
      setChannels(res.channels);
      setMembers(res.members);
    } else {
      setChannels({ text: [], audio: [], video: [] });
      setMembers([]);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query) {
        fetchData(query);
      } else {
        setChannels({ text: [], audio: [], video: [] });
        setMembers([]);
      }
    }, 500); // Adding a debounce delay to avoid immediate execution

    return () => clearTimeout(timerId);
  }, [query]);

  const user = useAuth();
  console.debug("Component Rerendered");
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-2 text-2xl font-bold text-center">
            Search Channels/Members
          </DialogTitle>
          <DialogDescription>
            <div className="w-full max-h-96 overflow-y-auto mt-4">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                type="search"
                className="w-full dark:bg-neutral-800 "
                placeholder="Search Here"
              />
            </div>

            <div className="searchResultsBody px-2 mt-6 mb-1">
              {channels && channels?.text && channels?.text?.length > 0 && (
                <>
                  <h4 className=" mt-3 mb-1 text-md">Text Channels</h4>
                  <div className="px-2  mb-2 flex flex-col gap-2">
                    {channels?.text?.map((item: any, index: any) => {
                      return (
                        <ChannelCard
                          key={index}
                          channel={item}
                          refreshChannels={()=>{fetchData("")}}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {channels && channels?.audio && channels?.audio?.length > 0 && (
                <>
                  <h4 className=" mt-3 mb-1 text-md">Audio Channels</h4>
                  <div className="px-2  mb-2 flex flex-col gap-1">
                    {channels?.audio?.map((item: any, index: any) => {
                      return (
                        <ChannelCard
                          key={index}
                          channel={item}
                          refreshChannels={()=>{fetchData("")}}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {channels && channels?.video && channels?.video?.length > 0 && (
                <>
                  <h4 className=" mt-3 text-md">Video Channels</h4>
                  <div className="px-2 mb-2">
                    {channels?.video?.map((item: any, index: any) => {
                      return (
                        <ChannelCard
                          key={index}
                          channel={item}
                          refreshChannels={()=>{fetchData("")}}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {members && members.length > 0 && (
                <>
                  <h4 className=" mt-1 text-md">Members</h4>
                  <div className="px-2 mt-2 mb-2">
                    {members?.map((item: any, index: any) => {
                      return (
                        <UserAvatar
                          key={index}
                          email={item.email}
                          id={item.id}
                          fetchMembers={() => {
                            fetchData("");
                          }}
                          memberAccountId={user.id}
                          name={user.username}
                          role={selectedServer.userRole}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
