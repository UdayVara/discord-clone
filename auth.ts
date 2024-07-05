import NextAuth from "next-auth"
import { AuthConfig } from "./authconfig"

export const { handlers, signIn, signOut, auth } = NextAuth(AuthConfig)