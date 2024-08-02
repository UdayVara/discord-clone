import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface channelState {
  channelId: string;
  name: string;
  role: userRoleType;
  serverId: string;
  type:string,
  isPersonal:boolean
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
  type:"",
  isPersonal:false
};

export const channelSlice = createSlice({
  name: "selected server",
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<{channelId:string,name:string,role:userRoleType,serverId:string,type:string,isPersonal:boolean}>) => {
      state.channelId = action.payload.channelId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.serverId = action.payload.serverId;
      state.type = action.payload.type
      state.isPersonal = action.payload.isPersonal
    },
    resetChannel: (state) => {
      state.channelId = "";
      state.name = "";
      state.role = userRoleType.guest;
      state.serverId = "";
      state.type = ""
      state.isPersonal=false
    },
  },
});

// Action creators are generated for each case reducer function
export const {
 setChannel,
 resetChannel
} = channelSlice.actions;

export default channelSlice.reducer;
