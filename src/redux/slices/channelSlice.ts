import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface channelState {
  channelId: string;
  name: string;
  role: userRoleType;
  serverId: string;
  type:string
}

export enum userRoleType {
  guest = "guest",
  moderator = "moderator",
}
const initialState: channelState = {
  channelId: "",
  name: "",
  role: userRoleType.guest,
  serverId: "",
  type:""
};

export const channelSlice = createSlice({
  name: "selected server",
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<{channelId:string,name:string,role:userRoleType,serverId:string,type:string}>) => {
      state.channelId = action.payload.channelId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.serverId = action.payload.serverId;
      state.type = action.payload.type
    },
    resetChannel: (state, action: PayloadAction<{channelId:string,name:string,role:userRoleType,serverId:string}>) => {
      state.channelId = "";
      state.name = "";
      state.role = userRoleType.guest;
      state.serverId = "";
      state.type = ""
    },
  },
});

// Action creators are generated for each case reducer function
export const {
 setChannel,
 resetChannel
} = channelSlice.actions;

export default channelSlice.reducer;
