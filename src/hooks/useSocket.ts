"use client"

import { SocketContext } from "@/Providers/context/socketContext"
import { useContext } from "react"
import { Socket } from "socket.io-client"

export const useSocket = () => {
    const socket = useContext(SocketContext)
    // socket.on("connect",()=>{
    //     console.log("user connected from use hook")
    // })
    return socket as Socket
}