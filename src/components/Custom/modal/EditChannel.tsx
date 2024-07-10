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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editChannel } from "@/actions/channel.action";
import { toast } from "sonner";

function EditChannel({
  isOpen,
  setOpen,
  id,
  name,
  type,
  refreshChannels,
}: {
  isOpen: boolean;
  setOpen: any;
  id: string;
  name: string;
  type: string;
  refreshChannels: any;
}) {
  const [data, setData] = useState({ name: name, type: type });
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (data.name !== "") {
      const res = await editChannel(
        {
          ...data,
        },
        id
      );
      if (res.success) toast.success(res.message);
      else toast.error(res.message);

      refreshChannels();
      setOpen(false);
      setData({ name: "", type: "text" });
    } else {
      //   dispatch(setChannel({ id: "", name: "", type: "" }));
      setError("Name Cannot Be Empty");
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-2 text-2xl font-bold text-center">
            Edit Channel
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4 font-semibold flex flex-col items-start">
              <h5>Channel Name</h5>
              <input
                type="text"
                className="p-2 w-full bg-slate-200 dark:bg-neutral-800 mt-1 focus:outline-none "
                defaultValue={data.name}
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
              Save
            </Button>
            <Button
              className="mt-4 mr-4 md:float-right float-none md:w-auto w-full"
              variant={"destructive"}
              onClick={()=>{
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditChannel;
