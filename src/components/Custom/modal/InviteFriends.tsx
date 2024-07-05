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

function InviteFriends({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
            Invite Your Friends
          </DialogTitle>
          <DialogDescription>
            <div className="mt-10 font-semibold flex flex-col items-start">
              <h5>Server Invite Link</h5>
              <div className="flex w-full gap-2 items-center">
                <input
                  type="text"
                  className="p-2 w-full bg-slate-200 dark:bg-neutral-800 focus:outline-none grow "
                  disabled
                  value={"this is random link here"}
                />
                <IoCopy className="text-2xl"/>
              </div>
            </div>
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InviteFriends;
