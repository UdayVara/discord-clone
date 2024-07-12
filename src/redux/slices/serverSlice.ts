import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface serverState {
  selectedServer: { id: string; name: string; userId: string };
  serverList: any[];
  selectedChannel: { id: string; name: string; type: string };
  userRole: string;
}

export enum userRoleType {
  guest = "guest",
  moderator = "moderator",
}
const initialState: serverState = {
  selectedServer: { id: "", name: "", userId: "" },
  serverList: [],
  selectedChannel: { id: "", name: "", type: "" },
  userRole: "",
};

export const serverSlice = createSlice({
  name: "selected server",
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedServer = { id: "", name: "", userId: "" };
    },
    selectServer: (
      state,
      action: PayloadAction<{ id: string; name: string; userId: string }>
    ) => {
      state.selectedServer = action.payload;
    },
    setServers: (state, action: PayloadAction<any[]>) => {
      state.serverList = action.payload;
    },
    resetServers: (state) => {
      state.serverList = [];
    },
    setChannel: (
      state,
      action: PayloadAction<{ id: string; name: string; type: string }>
    ) => {
      state.selectedChannel = action.payload;
    },
    resetChannel: (state) => {
      state.selectedChannel = { id: "", name: "", type: "" };
    },
    setRole: (state, action: PayloadAction<{ role: userRoleType }>) => {
      state.userRole = action.payload.role;
    },
    resetRole: (state) => {
      state.userRole = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  reset,
  selectServer,
  setServers,
  resetServers,
  setChannel,
  resetChannel,
} = serverSlice.actions;

export default serverSlice.reducer;
