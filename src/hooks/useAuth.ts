"use client";

import { AuthContext } from "@/Providers/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const res = useContext(AuthContext);

  return res
};
