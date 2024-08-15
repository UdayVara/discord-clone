  // auth.ts
  import NextAuth, { NextAuthConfig } from "next-auth";
  import Credentials from "next-auth/providers/credentials";
  import axiosInstance from "./axios";

  export const AuthConfig: NextAuthConfig = {
    secret:"thisismyrandomsecret",
    providers: [
      Credentials({
        async authorize(credentials, request) {
          console.debug("Credentials", credentials);
          try {
            if (credentials?.issignup == "false") {
              const res = await axiosInstance.post("/auth/signin", {
                email: credentials?.email,
                password: credentials?.password,
              });
              if (res?.data?.statusCode == 201) {
                return { ...res?.data?.user,token:res?.data?.token };
              } else {
                throw new Error(res.data?.message || "Internal Server Error");
              }
            } else {
              const res = await axiosInstance.post("/auth/signup", {
                username:credentials?.username,
                email: credentials?.email,
                password: credentials?.password,
              });
              if (res?.data?.statusCode == 201) {
                return { ...res?.data?.user };
              } else {
                throw new Error(res.data?.message || "Internal Server Error");
              }
            }
          } catch (error: any) {
            // console.log("Error");
            throw new Error(error.message || "Internal Server Error");
          }
        },
      }),
    ],
    callbacks: {
      jwt(params: any) {
        if (params.user) {
          params.token.user = params.user;
        }
        // console.log("token",params.token.user)
        return params.token;
      },
      session(params: any) {
        // console.log("session");
        if (params.token.user) {
          params.session.user = params.token;
        }
        // console.log("session", params.session);
        return params.session;
      },
    },
    session: {
      strategy:"jwt",
      maxAge: 24 * 60 * 60,
    },
    pages: {
      signOut: "/signin",
    },
    trustHost:true
  };
