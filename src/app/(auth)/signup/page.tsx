"use client";
import { getUser, signupUser } from "@/actions/Auth.action";
import { signupSchema } from "@/schemas/Auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await signupUser(data);

      if(result.success){
        toast.success(result.message);
        router.replace("/");
      }else{
        toast.error(result.message || "Internal Server Error")
      }
      
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
      console.debug("Error", error);
    }
    console.debug("Data", data);
  };
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image
          alt="Failed To Load"
          className="w-14 h-auto object-contain"
          width={1000}
          height={1000}
          src={"/assets/discord-logo.png"}
        />
        <div className="bg-white py-4 pb-9 px-8 mt-4 dark:bg-neutral-800 w-[450px] max-w-[95%] ">
          <h5 className="text-center text-3xl mb-8 mt-3">Signup For Discord</h5>
          <div
            className={`flex flex-col ${
              errors.username || errors.email || errors.password
                ? "gap-2"
                : "gap-5"
            }`}
          >
            <div>
              <h5 className="text-base font-semibold">Username</h5>
              <input
                {...register("username")}
                type="text"
                className="w-full py-2 px-1 border border-black shadow rounded dark:bg-neutral-900"
              />
              {errors.username && (
                <span className="text-red-600 first-letter:uppercase">
                  {errors?.username?.message}
                </span>
              )}
            </div>
            <div>
              <h5 className="text-base font-semibold">Email</h5>
              <input
                type="text"
                {...register("email")}
                className="w-full py-2 px-1 border border-black rounded dark:bg-neutral-900"
              />
              {errors.email && (
                <span className="text-red-600 first-letter:uppercase">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div>
              <h5 className="text-base font-semibold">Password</h5>
              <input
                type="password"
                {...register("password")}
                className="w-full py-2 px-1 border border-black rounded dark:bg-neutral-900"
              />
              {errors.password && (
                <span className="text-red-600 first-letter:uppercase">
                  {errors?.password?.message}
                </span>
              )}
            </div>
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 transition-all active:bg-indigo-700 w-full py-2 text-lg mt-6 rounded text-white"
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
          </button>
          <button className="dark:bg-neutral-950/80 dark:hover:bg-neutral-700 transition-all active:bg-indigo-700 w-full py-2 text-lg mt-3 rounded text-white flex flex-row items-center justify-center gap-2">Continue with    <FcGoogle size={20} /></button>
          <h5 className="text-center mt-4">
            Already Have An Account ?{" "}
            <Link href={"/signin"}>
              <span className="text-blue-600">Sign in</span>
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
}

export default Page;
