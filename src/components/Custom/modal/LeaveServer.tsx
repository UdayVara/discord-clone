"use client";
import React, { useState } from "react";
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

function LeaveServer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedServer = useSelector(
    (root: RootState) => root.server
  ).selectedServer;

  const handleLeaveServer = async () => {
    try {
      const res = await leaveServer(selectedServer.id);

      if (res.success) {
        const servers = await getServers();

        if (servers.success) {
          dispatch(setServers(servers.servers));
          dispatch(
            selectServer({
              id: servers.servers[0]?.id,
              name: servers.servers[0]?.name,
            })
          );
        }
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
    setOpen(false);
  };

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
            Leave Server
          </DialogTitle>
          <DialogDescription>
            <h5 className="text-center text-base mt-2">
              Are you sure you want to leave{" "}
              <span className="text-indigo-600">Edited</span> Server
            </h5>

            <div className="flex mt-16 px-4 justify-between w-full gap-2 items-center">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant={"primary"} onClick={handleLeaveServer}>
                Leave
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LeaveServer;
