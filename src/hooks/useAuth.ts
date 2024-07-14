"use client";

import { authContext } from "@/Providers/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const res = useContext(authContext);

  return res
};
