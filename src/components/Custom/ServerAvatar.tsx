"use client"

import Image from "next/image";
import React from "react";

function ServerAvatar({
  serverImage,
  serverTitle,
}: {
  serverImage: string;
  serverTitle: string;
}) {
    const isActive = false;
  return (
    <>
      <div className={`my-2 ${!isActive && "border-none"} dark:border-s dark:border-s-neutral-200 border-s-neutral-950 border-s-2 cursor-pointer`}>
            <Image alt="Failed To Load" src={"http://localhost:5000" + `/${serverImage}`} width={1000} height={1000} className="w-full rounded-2xl hover:rounded-full transition-all" />
      </div>
    </>
  );
}

export default ServerAvatar;
