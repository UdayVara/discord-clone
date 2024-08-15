"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getUser } from "@/actions/Auth.action";

 const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Start with `null` instead of an empty object.

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      console.debug("User Res",res.user)
      setUser(res?.user || null); // Use optional chaining and start with `null`.
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};


export default UserContextProvider;