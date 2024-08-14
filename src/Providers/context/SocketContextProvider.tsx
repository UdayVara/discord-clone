"use client";

import React, { useEffect, useRef } from "react";
import { SocketContext } from "./socketContext";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  let socketConnection = useRef<Socket | null>(null);

  useEffect(()=>{
    console.debug("user",user)
    if (user && user.id) {
      socketConnection.current = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        transports: ["websocket", "polling"],
        auth: {
          token: "Bearer " + user.token,
          id:user.id
        },
      });
  
      socketConnection.current.on("error", (data) => {
        console.debug("Error Received", data);
        toast.error(data.message || "Internal Server Error");
      });
    }
  },[user])
  

  return (
    <SocketContext.Provider value={socketConnection.current as Socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
