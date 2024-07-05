"use client";
import { getUser, signinUser } from "@/actions/Auth.action";
import { signInSchema, signupSchema } from "@/schemas/Auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async(data: any) => {
    try {
      const result = await signinUser(data)
      const res = await getUser()
      console.debug("response",res)
    } catch (error) {
      console.debug("Error",error)
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
          <h5 className="text-center text-3xl mb-8 mt-3">Signin For Discord</h5>
          <div
            className={`flex flex-col ${
              errors.email || errors.password ? "gap-2" : "gap-5"
            }`}
          >
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
                type="text"
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
            Sign in
          </button>
          <h5 className="text-center mt-4">
            Don't Have An Account ?{" "}
            <Link href={"/signup"} ><span className="text-blue-600">Sign up</span></Link>
            
          </h5>
        </div>
      </div>
    </>
  );
}

export default Page;
