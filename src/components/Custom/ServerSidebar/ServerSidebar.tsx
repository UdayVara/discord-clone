"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdExpandMore } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import InviteFriends from "../modal/InviteFriends";
import ManageMembers from "../modal/ManageMembers";
import CreateChannel from "../modal/CreateChannel";
import { CiLogout } from "react-icons/ci";
import LeaveServer from "../modal/LeaveServer";
import SearchBox from "./SearchBox";
import ServerBody from "./ServerBody";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRole, userRoleType } from "@/redux/slices/serverSlice";
import { getMembers, getUserRole } from "@/actions/Server.action";
import { toast } from "sonner";
import { getUser } from "@/actions/Auth.action";
import { useSocket } from "@/hooks/useSocket";

function ServerSidebar() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
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

  console.log("Current Role", role);

  return (
    <>
      <div
        className={`min-w-64 max-w-full ${
          params && params.serverId ? "md:flex hidden" : "md:w-auto w-full "
        }  h-full flex-col  dark:bg-neutral-900/40  bg-slate-200/50 px-3`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full items-center flex justify-between text-base py-2 ">
            {selectedServer.name} <MdExpandMore className="text-lg" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 dark:bg-neutral-950">
            {role == userRoleType.moderator && (
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => {
                  setInviteOpen(true);
                }}
              >
                Invite People <FaUserPlus className="text-md" />
              </DropdownMenuItem>
            )}
            {role == userRoleType.moderator && (
              <DropdownMenuItem className="flex items-center justify-between">
                Server Settings <IoSettings className="text-md " />
              </DropdownMenuItem>
            )}
            {role == userRoleType.moderator && (
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => {
                  setManageOpen(true);
                }}
              >
                Manage Members <MdManageAccounts className="text-md" />
              </DropdownMenuItem>
            )}
            {role == userRoleType.moderator && (
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => {
                  setChannelOpen(true);
                }}
              >
                Create Channel <MdCreateNewFolder className="text-md" />
              </DropdownMenuItem>
            )}
            {role == userRoleType.moderator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="flex items-center justify-between text-rose-600"
              onClick={() => {
                setLogoutOpen(true);
              }}
            >
              Leave Server <CiLogout className="text-md" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SearchBox />
        <ServerBody members={members} fetchMembers={fetchMembers} role={role} />
      </div>

      <InviteFriends open={inviteOpen} setOpen={setInviteOpen} />
      <ManageMembers open={manageOpen} setOpen={setManageOpen} />
      <CreateChannel
        refreshChannels={() => {}}
        open={channelOpen}
        setOpen={setChannelOpen}
      />
      <LeaveServer open={logoutOpen} setOpen={setLogoutOpen} />
    </>
  );
}

export default ServerSidebar;
