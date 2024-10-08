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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createChannels } from "@/actions/channel.action";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function CreateChannel({
  open,
  setOpen,
  refreshChannels,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshChannels: () => void;
}) {
  const [data, setData] = useState({ name: "", type: "text" });
  const [error, setError] = useState("");
  const selectedServer = useSelector(
    (store: RootState) => store.server.selectedServer
  );
  const onSubmit = async () => {
    if (data.name !== "") {
      const res = await createChannels({
        ...data,
        serverId: selectedServer.id,
      });
      refreshChannels();
      setData({ name: "", type: "text" });
      setOpen(false);
    } else {
      setError("Name Cannot Be Empty");
    }
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
            Create New Channel
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 font-semibold flex flex-col items-start">
              <h5>Channel Name</h5>
              <input
                type="text"
                className="p-2 w-full bg-slate-200 dark:bg-neutral-800 mt-1 focus:outline-none "
                value={data.name}
                onChange={(e) => {
                  {
                    setData({ ...data, name: e.target.value });
                    if (e.target.value != "") {
                      setError("");
                    }
                  }
                }}
              />
              <span className="text-rose-600">{error}</span>
            </div>
            <div className="mt-4 font-semibold flex flex-col items-start">
              <h5>Channel Type</h5>
              <Select
                onValueChange={(value) => {
                  setData({ ...data, type: value });
                }}
                value={data.type}
              >
                <SelectTrigger className="mt-1 p-2 w-full bg-slate-200 dark:bg-neutral-800 ">
                  <SelectValue placeholder="Select Server Type " />
                </SelectTrigger>
                <SelectContent className="bg-slate-200 dark:bg-neutral-900 ">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="mt-4 md:float-right float-none md:w-auto w-full"
              variant={"primary"}
              onClick={onSubmit}
            >
              Create
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannel;
