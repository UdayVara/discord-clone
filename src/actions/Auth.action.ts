"use server";
import { auth, signIn, signOut } from "../../auth";

export const signinUser = async (data: any) => {
  try {
    const res = await signIn("credentials", {
      username: "mydemo",
      email: "Mydemo@gmail.com0",
      password: "mypass@1234",
      role: "admin",
      redirect: false,
    });
    console.log("Response", res);
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      message: error.message || "Internal Server Error",
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
