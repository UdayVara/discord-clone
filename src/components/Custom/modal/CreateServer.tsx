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

import { addServer, getServers } from "@/actions/Server.action";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setServers } from "@/redux/slices/serverSlice";

function CreateServer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  // toast.success("hello")
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!name || !file) {
      return toast.success("Name or Image Missing");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    try {
      const res = await addServer(formData);
      console.log(res, "result");
      setOpen(false);
      if (res.success) {
        toast.success(res.message);
        const result = await getServers();

        if (result.success) {
          dispatch(setServers(result.servers));
        }
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
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
            Create Your Server
          </DialogTitle>
          <DialogDescription>
            Give your Server personality with a name and image which you can
            always change
            <SingleDropZone file={file} setFile={setFile} />
            <div className="mt-4 font-semibold flex flex-col items-start">
              <h5>Server Name</h5>
              <input
                type="text"
                className="p-2 w-full bg-slate-200 dark:bg-neutral-800 focus:outline-none "
                value={name}
                onChange={(e) => {
                  {
                    setName(e.target.value);
                  }
                }}
              />
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

export default CreateServer;
