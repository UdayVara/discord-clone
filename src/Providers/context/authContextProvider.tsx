"use client";

import { useEffect, useState } from "react";
import { authContext } from "./authContext";
import { getUser } from "@/actions/Auth.action";

export const UserContextProvider = ({children}:{children:React.ReactNode}) => {
  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    const res = await getUser();

    setUser(res.user || {});
  };

  useEffect(()=>{
    fetchUser()
  },[])
  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};
