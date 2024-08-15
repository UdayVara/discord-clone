"use client";

import { useEffect, useState } from "react";
import { authContext } from "./authContext";
import { getUser } from "@/actions/Auth.action";

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Start with `null` instead of an empty object.

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      console.debug("User",res.user)
      setUser(res?.user || null); // Use optional chaining and start with `null`.
    };

    fetchUser();
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};
