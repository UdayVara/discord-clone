"use client";

import { ModeToggle } from "@/components/Custom/ModeToggler";
import { useSocket } from "@/hooks/useSocket";
// import { socketInstance } from "@/Providers/context/socketContext";
import Image from "next/image";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function Home() {
  const socket = useSocket();

  // if (socket.connected) {
  //   console.debug("user connected", socket.id);
  // }

  // socket.on("connect", () => {
  //   console.debug("user connected with id", socket.id);
  // });
  socket.on("hello", (message) => {
    console.debug("Event Hello Received", message);
  });
  // socket.on("disconnect", () => {
  //   console.debug("user disconnected with id", socket.id);
  // });

socket.on("connect",()=>{
  console.debug("User connected page")
})
socket?.on("disconnect",()=>{
  console.debug("User di page")
})



  console.debug("Hello world")

  // socket.connected
  return (
    <>
      <div className="md:block hidden">
        <h2>Hello World</h2>
      </div>
    </>
  );
}
