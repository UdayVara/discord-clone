import ServerSidebar from "@/components/Custom/ServerSidebar/ServerSidebar";
import Sidebar from "@/components/Custom/MiniSidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  UserContextProvider  from "@/Providers/context/AuthContextProvider";
import SocketContextProvider from "@/Providers/context/SocketContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex w-full h-screen overflow-y-hidden ">
        <UserContextProvider>
          <SocketContextProvider>
            <Sidebar />
            <ServerSidebar />
            {children}
          </SocketContextProvider>
        </UserContextProvider>
      </div>
    </>
  );
}
