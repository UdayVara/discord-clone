"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectServer } from "@/redux/slices/serverSlice";
import { useRouter } from "next/navigation";

export function ServerDropdown({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("");
  const server = useSelector((store: RootState) => store.server);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="mb-5">
      <Select
        defaultValue={server.selectedServer.id}
        onValueChange={(value) => {
          if (value != "") {
            const findServer = server.serverList.find(
              (item) => item.id == value
            );
            dispatch(
              selectServer({
                id: findServer.id,
                name: findServer.name,
                userId: findServer.userId,
              })
            );
            setOpen(false);

            router.push(`/server/${value}`);
          }
        }}
      >
        <SelectTrigger className="w-full dark:bg-neutral-800 outline-none focus:outline-none focus:border-none ring-0 focus:ring-0">
          <SelectValue
            className="dark:bg-neutral-800 outline-none focus:outline-none"
            placeholder="Select Server"
          />
        </SelectTrigger>
        <SelectContent className="dark:bg-neutral-800">
          {server.serverList.map((item, index) => {
            return (
              <SelectItem key={index} value={item.id}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
