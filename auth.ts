// auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      authorize(credentials, request) {
        // console.debug("Credentials", credentials);
        return { ...credentials };
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
      console.log("session")
      if (params.token.user) {
        params.session.user = params.token;
      }
      console.log("session",params.session)
      return params.session.user;
    },
  },
};
