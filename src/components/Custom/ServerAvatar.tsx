"use client";

import { selectServer } from "@/redux/slices/serverSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ServerAvatar({
  serverImage,
  serverTitle,
  serverId,
  userId
}: {
  serverImage: string;
  serverTitle: string;
  serverId: string;
  userId:string
}) {
  const isActive = false;
  const dispatch = useDispatch();

  const selectedServer = useSelector(
    (root: RootState) => root.server
  ).selectedServer;

  const router = useRouter()
  return (
    <>
      <div
        className={` ${
          selectedServer.id != serverId && "border-none"
        } dark:border-s dark:border-s-neutral-200 border-s-neutral-950 border-s-2 cursor-pointer`}
        onClick={() => {
          dispatch(selectServer({ id: serverId, name: serverTitle,userId: userId}));
          router.replace(`/server/${serverId}`)
        }}
      
      >
        <Image
          alt="Failed To Load"
          src={`${serverImage}`}
          width={1000}
          height={1000}
          className="w-full rounded-2xl max-w-[90%] ml-auto hover:rounded-full transition-all"
        />
      </div>
    </>
  );
}

export default ServerAvatar;
