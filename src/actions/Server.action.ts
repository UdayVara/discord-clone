"use server";

import axiosInstance from "../../axios";

export const addServer = async (data: any) => {
  try {
    const res = await axiosInstance.post("/server", data);

    if (res.data.statusCode == 201) {
      return { success: true, message: "Server Added Successfully" };
    }
    return {
      success: false,
      message: res?.data?.message || "Failed To Create Server",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getServers = async () => {
  try {
    const res = await axiosInstance.get("/server")

    if(res.data?.statusCode == 201){
      return {success:true,message:"Servers Fetched Successfully",servers:res?.data?.servers}
    }else{
      return {success:false,message:res?.data?.message || "Failed To Get Servers"}
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Server Error" };
  }
};
