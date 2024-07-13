"use server";

import axiosInstance from "../../axios";

export const getChannels = async (serverId:string) => {
  try {
    const res = await axiosInstance.get(`/channel/${serverId}`);

    // console.log("resonse",res.data)
    if (res.data?.statusCode == 201) {
      return {
        success: true,
        message: "Channels Fetched Successfully",
        channels:{text:res?.data?.textChannels || [],audio:res?.data?.audioChannels || [],video:res?.data?.videoChannels || []}
      };
    } else {
      return {
        success: false,
        message: res?.data?.message || "Failed To Get Channels",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};


export const createChannels = async (data: any) => {
    try {
      const res = await axiosInstance.post("/channel", data);
  
      if (res.data.statusCode == 201) {
        return { success: true, message: "Channel Added Successfully" };
      }
      return {
        success: false,
        message: res?.data?.message || "Failed To Create Channel",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Internal Server Error",
      };
    }
  };
export const editChannel = async (data: any,channelId:string) => {
    try {
      const res = await axiosInstance.patch(`/channel/${channelId}`, data);
  
      if (res.data.statusCode == 201) {
        return { success: true, message: "Channel Added Successfully" };
      }
      return {
        success: false,
        message: res?.data?.message || "Failed To Create Channel",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Internal Server Error",
      };
    }
  };
export const deleteChannels = async (id: any) => {
    try {
      const res = await axiosInstance.delete(`/channel/${id}`);
  
      if (res.data.statusCode == 201) {
        return { success: true, message: "Channel Deleted Successfully" };
      }
      return {
        success: false,
        message: res?.data?.message || "Failed To Delete Channel",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Internal Server Error",
      };
    }
  };