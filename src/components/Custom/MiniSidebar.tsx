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
import { useRouter } from "next/navigation";
import { getServers } from "@/actions/Server.action";
import { toast } from "sonner";

function MiniSidebar() {
  const [open, setOpen] = useState(false);
  const [servers,setServers] = useState([])
  const router = useRouter();
  const handleLogout = async () => {
    const res = await signoutUser();

    router.replace("signin");
  };

  const fetchServers = async() => {
    const res = await getServers()

    if(res.success){
      console.debug(res.servers)
      setServers(res.servers)
    }else{
      toast.error(res.message || "Internal Server Error")
    }
  }

  useEffect(()=>{
    fetchServers()
  },[])
  return (
    <>
      <div className="w-14 h-screen overflow-y-hidden bg-neutral-100/70  flex-col items-center px-1 py-2 justify-between lg:flex hidden dark:bg-neutral-900 pb-2">
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
          <div className="my-2  overflow-y-auto  ">
            {
              servers && servers.length > 0 && servers.map((item:any,index:any)=>{
                return <ServerAvatar key={index} serverImage={item.serverImage} serverTitle={item.name} />
              })
            }
            
            {/* <ServerAvatar serverImage="" serverTitle="" /> */}
          </div>
        </div>
        <div id="footer-sidebar" className="flex flex-col gap-2 items-center ">
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
