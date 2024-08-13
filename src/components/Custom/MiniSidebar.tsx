"use client";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ModeToggle } from "./ModeToggler";
import CreateServer from "./modal/CreateServer";
import ServerAvatar from "./ServerAvatar";
import { SlLogout } from "react-icons/sl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signoutUser } from "@/actions/Auth.action";
import { useParams, useRouter } from "next/navigation";
import { getServers } from "@/actions/Server.action";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectServer, setServers } from "@/redux/slices/serverSlice";

function MiniSidebar() {
  const [open, setOpen] = useState(false);
  // const [servers, setServers] = useState([]);
  const servers = useSelector((root: RootState) => root.server).serverList;
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const handleLogout = async () => {
    const res = await signoutUser();

    router.replace("signin");
  };

  const fetchServers = async () => {
    const res = await getServers();

    if (res.success) {
      dispatch(setServers(res.servers));
      if (params.serverId) {
        const findServer = await res?.servers?.find(
          (item: any) => item.id == params.serverId
        );
        if (findServer) {
          dispatch(
            selectServer({
              id: findServer?.id,
              name: findServer?.name,
              userId: findServer?.userId,
            })
          );
          router.replace(`/server/${findServer?.id}`)
        }
      } else {
        if (res.servers.length > 0) {
          dispatch(
            selectServer({
              id: res.servers[0].id,
              name: res.servers[0].name,
              userId: res.servers[0].userId,
            })
          );
          router.replace(`/server/${res?.servers[0]?.id}`)
        }
      }
    } else {
      toast.error(res.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    fetchServers();
  }, [router]);
  return (
    <>
      <div className="w-14 relative h-screen overflow-y-hidden bg-neutral-100/70  flex-col items-center px-1 py-2 justify-between lg:flex hidden dark:bg-neutral-900 pb-2">
        <div id="header-sidebar grow  gap-3 h-[80%]">
          <button
            className="dark:bg-neutral-700/45 dark:shadow-none shadow-md bg-neutral-100/90 border-2 block mx-auto  dark:border-none p-2 rounded-full"
            onClick={() => {
              setOpen(true);
            }}
          >
            <BsPlusLg className="text-xl text-emerald-600" />
          </button>
          <hr className="mt-3 border border-black dark:border-neutral-100" />
          <div className="my-2 max-h-[75vh] overflow-y-auto flex flex-col gap-4 pt-2 ">
            {servers &&
              servers.length > 0 &&
              servers.map((item: any, index: any) => {
                return (
                  <ServerAvatar
                    serverId={item.id}
                    key={index}
                    serverImage={item.serverImage}
                    serverTitle={item.name}
                    userId={item.userId}
                  />
                );
              })}

            {/* <ServerAvatar serverImage="" serverTitle="" /> */}
          </div>
        </div>
        <div
          id="footer-sidebar"
          className=" z-2 absolute bottom-2 flex flex-col gap-2 items-center "
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SlLogout onClick={handleLogout} className="text-red-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ModeToggle />
        </div>
      </div>

      <CreateServer open={open} setOpen={setOpen} />
    </>
  );
}

export default MiniSidebar;
