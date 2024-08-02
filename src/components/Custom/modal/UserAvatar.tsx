"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { PiDotsThreeBold } from "react-icons/pi";
import { userRoleType } from "@/redux/slices/serverSlice";
import { setUserRole } from "@/actions/Server.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { getUser } from "@/actions/Auth.action";
import { useAuth } from "@/hooks/useAuth";
import { setChannel } from "@/redux/slices/channelSlice";
import { useSocket } from "@/hooks/useSocket";

function UserAvatar({
  name,
  id,
  role,
  fetchMembers,
  email,
  memberAccountId,
  owner,
}: {
  name: string;
  id: string;
  role: userRoleType;
  fetchMembers: any;
  email: string;
  memberAccountId: string;
  owner?: boolean;
}) {
  const server = useSelector((store: RootState) => store.server);
  const socket = useSocket();
  const user = useAuth();
  const handleRoleChange = async (value: userRoleType) => {
    try {
      const res = await setUserRole({
        serverId: server.selectedServer.id,
        memberId: id,
        role: value,
      });

      if (res.success) {
        fetchMembers();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Internal Server Error");
    }
  };
  const dispatch = useDispatch();
  // const [role, setRole] = useState("guest");
  return (
    <div
      className={`flex flex-row gap-2 w-full items-center ${
        memberAccountId != user?.id && "cursor-pointer"
      } `}
      onClick={() => {
        if (memberAccountId !== user?.id) {
          dispatch(
            setChannel({
              channelId: memberAccountId,
              name: name,
              role: userRoleType.moderator,
              serverId: socket.id || "",
              type: "text",
              isPersonal: true,
            })
          );
        }
      }}
    >
      <div className="flex flex-row items-center gap-3 grow">
        <div className="rounded-full w-9 flex items-center justify-center h-9 bg-purple-900 text-white">
          {name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex justify-start flex-row grow gap-3">
          <div className="flex flex-col  items-start grow">
            <h4>
              {name}{" "}
              <span className="text-xs text-neutral-400 inline">
                {memberAccountId == user?.id && "(You) "} {owner && "(Owner) "}
              </span>
            </h4>
            <p className=" dark:text-neutral-300 text-xs">{email}</p>
          </div>
        </div>

        {server.userRole == userRoleType.moderator &&
          memberAccountId !== user?.id && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <PiDotsThreeBold className="mt-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  className="w-56 bg-slate-100 dark:bg-neutral-900/90"
                >
                  <DropdownMenuLabel>User Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={role}
                    onValueChange={(value) => {
                      handleRoleChange(value as userRoleType);
                    }}
                  >
                    <DropdownMenuRadioItem value="guest">
                      Guest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="moderator">
                      Moderator
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
      </div>
    </div>
  );
}

export default UserAvatar;
