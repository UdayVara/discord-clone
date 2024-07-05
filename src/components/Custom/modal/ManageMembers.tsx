"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserAvatar from "./UserAvatar";

function ManageMembers({
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
          <DialogTitle className="mt-2   text-center">
            <h4 className="text-2xl font-bold">Manage Members</h4>
            <p className="text-center text-base mt-1 font-normal">2 members</p>
          </DialogTitle>
          <DialogDescription>
          <div className="mt-10 max-h-80 overflow-y-auto font-semibold flex flex-col gap-3 items-start px-2">
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
              <UserAvatar />
            </div>
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ManageMembers;
