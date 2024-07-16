"use server";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../../auth";
import { NextResponse } from "next/server";

export const signinUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      ...credentials,
      issignup: false,
      redirect: false,
    });

    return { success: true, message: "User Sign in Successfully" };
  } catch (error: any) {
    console.log(error?.cause?.err?.message, "error");
    return {
      success: false,
      message: error?.cause?.err?.message || "Internal Server Error",
    };
  }
};

export const signupUser = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      ...credentials,
      issignup: true,
      redirect: false,
    });

    return { success: true, message: "User Sign in Successfully" };
  } catch (error: any) {
    console.log(error?.cause?.err?.message, "error");
    return {
      success: false,
      message: error?.cause?.err?.message || "Internal Server Error",
    };
  }
};

export const getUser = async () => {
  try {
    const user = await auth();

    return { success: true, user: user?.user };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

export const signoutUser = async () => {
  try {
    const res = await signOut({ redirect: false });
    console.debug("signout user action");
    redirect("/signin")
    // return {success:true,message:"User Signed Out"}
  } catch (error) {
    console.log("Signout Error", error);
    return { success: false, message: "Internal server error" };
  }
};
