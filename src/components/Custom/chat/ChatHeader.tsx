"use client";
import { useSocket } from "@/hooks/useSocket";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import ServerBody from "../ServerSidebar/ServerBody";
import { useParams } from "next/navigation";
import { setRole, userRoleType } from "@/redux/slices/serverSlice";
import { getMembers, getUserRole } from "@/actions/Server.action";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/actions/Auth.action";
import { ServerDropdown } from "../ServerSidebar/ServerDropdown";
import ServerSidebar from "../ServerSidebar/ServerSidebar";

function ChatHeader() {
  const channel = useSelector((root: RootState) => root.channel);
  const [open, setOpen] = useState(false);
  const socket = useSocket();
  // console.log(socket.connected);
  const [role, setRoleState] = useState<userRoleType>(userRoleType.guest);
  const [members, setMembers] = useState([]);
  const params = useParams();

  const selectedServer = useSelector(
    (root: RootState) => root.server
  ).selectedServer;
  const dispatch = useDispatch();
  const getRole = async () => {
    try {
      const user: any = await getUser();
      if (selectedServer.userId == user?.user.id) {
        setRoleState(userRoleType.moderator);
        dispatch(setRole(userRoleType.moderator));
      } else {
        const res = await getUserRole(selectedServer.id);
        console.debug("Role Res", res);
        if (res.success) {
          setRoleState(res.role);
          dispatch(setRole(res.role));
        } else {
          setRoleState(userRoleType.guest);
          dispatch(setRole(userRoleType.guest));
        }
      }
    } catch (error) {
      console.log("error", error);
      setRoleState(userRoleType.guest);
      dispatch(setRole(userRoleType.guest));
      toast.error("Something Went Wrong");
    }
  };

  const fetchMembers = async () => {
    const res = await getMembers(selectedServer.id);

    if (res.success) {
      setMembers(res.members);
    } else {
      toast.error(res.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    setRoleState(userRoleType.guest);
  }, [selectedServer.id]);

  useEffect(() => {
    if (role == userRoleType.moderator) {
      fetchMembers();
    } else {
      setMembers([]);
    }
  }, [role]);
  useEffect(() => {
    setRoleState(userRoleType.guest);
    if (selectedServer.id != "") {
      getRole();
    }
  }, [selectedServer]);

  const user = useAuth();
  return (
    <>
      {channel.channelId && (
        <div className="w-full flex-row border-b py-3 px-2 flex justify-between items-center">
          <div className="flex items-center gap-3 dark:text-neutral-300 text-neutral-700">
            <GiHamburgerMenu
              onClick={() => {
                setOpen(!open);
              }}
              className="md:hidden block"
            />
            <div className="flex flex-row items-center md:gap-3 gap-2">
              <div className="rounded-full w-9 flex items-center justify-center h-9 bg-purple-900 text-white">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
              {user?.username?.charAt(0)?.toUpperCase() +
                user?.username?.slice(1)}
            </div>
          </div>
          <h3  className={`${socket.connected ? (socket.io.engine.transport.name == "websocket" ? "bg-green-600 " : "bg-yellow-600" ) : "bg-red-600" } py-2 px-3 rounded-xl text-sm`}>
            {socket && socket.connected
              ? socket.io.engine.transport.name || "Connected"
              : "Not Connected"}
          </h3>
        </div>
      )}
      <Sheet
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent side="left" className="dark:bg-neutral-900/80">
          <SheetHeader>
            <SheetTitle>Discord</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col mt-5 overflow-y-auto">
                <ServerSidebar />
                <ServerDropdown open={open} setOpen={setOpen} />
                <ServerBody
                  members={members || []}
                  fetchMembers={fetchMembers}
                  role={role}
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatHeader;
