"use client";

import React from "react";
import { SocketContext } from "./socketContext";
import { io, Socket } from "socket.io-client";

function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const socketConnection = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    transports: ["websocket","polling"],
  });
  console.debug("Socket", socketConnection);
  return (
    <SocketContext.Provider value={socketConnection}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
