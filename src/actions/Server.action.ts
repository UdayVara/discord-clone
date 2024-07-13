"use server";

import { userRoleType } from "@/redux/slices/serverSlice";
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
    const res = await axiosInstance.get("/server");

    if (res.data?.statusCode == 201) {
      return {
        success: true,
        message: "Servers Fetched Successfully",
        servers: res?.data?.servers,
      };
    } else {
      return {
        success: false,
        message: res?.data?.message || "Failed To Get Servers",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getSeverById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/server/${id}`);

    if (res.data?.statusCode == 200) {
      return {
        success: true,
        message: "Server Fetched Successfully",
        server: res.data?.server,
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Failed to get Server",
      };
    }
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

export const joinServer = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/server/join/${id}`);

    if (res.data.statusCode == 201) {
      return { success: true, message: "Server Joined Successfully" };
    } else {
      return {
        success: false,
        message: res.data?.message || "Internal Server Error",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};
export const leaveServer = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/server/leave/${id}`);

    if (res.data.statusCode == 201) {
      return { success: true, message: "Server Joined Successfully" };
    } else {
      return {
        success: false,
        message: res.data?.message || "Internal Server Error",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getMembers = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/server/members/${id}`);
    console.log("Member Res",res.data)
    if (res.data.statusCode == 201) {
      return {
        success: true,
        message: "Members Fetched Successfully",
        members: res.data.members,
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Internal Server Error",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getUserRole = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/server/role/${id}`);

    console.log("Current ROle", res?.data);
    if (res.data.statusCode == 200) {
      return {
        success: true,
        message: "Server Role Fetched Successfully",
        role: res?.data?.role,
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Internal Server Error",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};
export const setUserRole = async (data: {
  serverId: string;
  memberId: string;
  role: userRoleType;
}) => {
  try {
    const res = await axiosInstance.patch(`/server/role/set`,data);

    if (res.data.statusCode == 201) {
      
      return {
        success: true,
        message: "Role Set Successfully",
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Internal Server Error",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};
