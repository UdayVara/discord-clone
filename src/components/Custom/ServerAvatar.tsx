"use client";

import { selectServer } from "@/redux/slices/serverSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ServerAvatar({
  serverImage,
  serverTitle,
  serverId,
}: {
  serverImage: string;
  serverTitle: string;
  serverId: string;
}) {
  const isActive = false;
  const dispatch = useDispatch();

  const selectedServer = useSelector(
    (root: RootState) => root.server
  ).selectedServer;
  return (
    <>
      <div
        className={` ${
          selectedServer.id != serverId && "border-none"
        } dark:border-s dark:border-s-neutral-200 border-s-neutral-950 border-s-2 cursor-pointer`}
        onClick={() => {
          dispatch(selectServer({ id: serverId, name: serverTitle }));
        }}
      >
        <Image
          alt="Failed To Load"
          src={"http://localhost:5000" + `/${serverImage}`}
          width={1000}
          height={1000}
          className="w-full rounded-2xl max-w-[90%] ml-auto hover:rounded-full transition-all"
        />
      </div>
    </>
  );
}

export default ServerAvatar;
