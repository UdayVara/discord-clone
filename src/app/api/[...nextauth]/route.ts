import NextAuth from "next-auth"
import { AuthConfig } from "../../../../auth"

export const { handlers, signIn, signOut, auth } = NextAuth(AuthConfig)