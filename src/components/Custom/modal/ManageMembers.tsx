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

import UserAvatar from "./UserAvatar";
import { getMembers } from "@/actions/Server.action";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

function ManageMembers({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [members, setMembers] = useState<any[]>([]);
  const server = useSelector((store: RootState) => store.server);
  const fetchMembers = async () => {
    try {
      const res = await getMembers(server.selectedServer.id);
      console.debug("Members",res.members)
      if (res.success) {
        setMembers(res.members || []);
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    if(server.selectedServer.id != ""){

      fetchMembers();
    }
  }, [server.selectedServer]);
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
            <p className="text-center text-base mt-1 font-normal">{members.length} members</p>
          </DialogTitle>
          <DialogDescription>
            <div className="mt-10 max-h-80 overflow-y-auto font-semibold flex flex-col gap-3 items-start px-2">

          {
            members && members.length > 0 && members.map((item:any,index)=>{
              return <UserAvatar email={item.users.email} fetchMembers={fetchMembers} id={item.id} memberAccountId={item.users.id} name={item.users.username} owner={item?.owner || false} role={item.role} key={index}/>
            })
          }

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ManageMembers;
