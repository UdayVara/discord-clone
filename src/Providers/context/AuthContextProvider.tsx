"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getUser } from "@/actions/Auth.action";

 function AuthContextProvider ({ children }: { children: React.ReactNode })  {
  const [user, setUser] = useState<any>(null); 
  console.debug("Auth Context Provider Mounted")
  const fetchUser = async () => {
    console.debug("Fetch User Called");
    const res = await getUser();
    console.debug("User Res",res.user)
    setUser(res?.user || null); // Use optional chaining and start with `null`.
  };
  useEffect(() => {
    setTimeout(()=>{
      fetchUser();
    },300)
  }, []);

  return <>{user ? <AuthContext.Provider value={user}>{children}</AuthContext.Provider> : <div>loading...</div>}</>;
};


export default AuthContextProvider;