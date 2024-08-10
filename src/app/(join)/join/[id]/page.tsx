"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSeverById, joinServer } from "@/actions/Server.action";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { selectServer } from "@/redux/slices/serverSlice";

function Join({ params }: { params: { id: string } }) {
  const [server, setServer] = useState<any>({});

  const getServer = async () => {
    try {
      const res = await getSeverById(params.id);

      if (res?.success) {
        setServer(res.server || {});
      } else {
        toast.error(res?.message || "Invalid Invite Link");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const handleJoinServer = async () => {
    try {
      const res = await joinServer(params.id);
      if (res.success) {
        toast.success(res.message || "Server Joined Successfully");
        dispatch(selectServer({ id: params.id, name: server?.name || "",userId:server.userId }));
        router.replace("/")
      } else {
        toast.error(res.message || "Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };
  console.debug("Server",server)
  useEffect(() => {
    getServer();
  }, []);
  return (
    <>
      {server && Object.keys(server).length > 0 && (
        <div className="max-w-md mt-14 mx-auto flex flex-col">
          <h4 className="text-center lg:text-xl">You Are Invited to Join</h4>
          <Image
            width={1000}
            height={1000}
            className="w-44 h-44 object-contain block mx-auto dark:bg-neutral-950 mt-4 rounded-full p-2"
            alt="Failed To Load"
            src={`${server.serverImage}`}
          />
          <h5 className="text-center text-lg mt-2">{server.name}</h5>
          <div className="button-wrapper flex flex-row items-center justify-center gap-5 mt-7">
            <Button variant={"primary"} onClick={handleJoinServer} size={"lg"}>
              Join
            </Button>
            <Button
              variant={"destructive"}
              size={"lg"}
              onClick={() => {
                router.replace("/");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Join;
