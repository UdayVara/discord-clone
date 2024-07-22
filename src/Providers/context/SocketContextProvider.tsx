"use client";

import React, { useEffect } from "react";
import { SocketContext } from "./socketContext";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  let socketConnection: Socket | null = null;

  if (user && user.id) {
    socketConnection = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      transports: ["websocket", "polling"],
      auth: {
        token: "Bearer " + user.token
      },
    });

    socketConnection.on("error", (data) => {
      console.debug("Error Received", data);
      toast.error(data.message || "Internal Server Error");
    });
  }

  return (
    <SocketContext.Provider value={socketConnection as Socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
