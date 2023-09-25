import {
  signIn as NextAuthSignIn,
  signOut as NextAuthSingOut,
} from "next-auth/react"

export const login = NextAuthSignIn

export const logout = NextAuthSingOut
