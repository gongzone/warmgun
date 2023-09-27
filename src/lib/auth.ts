import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { AuthOptions, type NextAuthOptions } from "next-auth"
// import { getServerSession as NextAuthGetServerSession } from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// import {
//   signIn as NextAuthSignIn,
//   signOut as NextAuthSingOut,
//   useSession,
// } from "next-auth/react"

export const authOptions = {
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET ?? "",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      //@ts-ignore
      profile(profile) {
        return { role: "USER" }
      },
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    session({ session, user }) {
      if (!session.user) {
        return session
      }
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
} satisfies NextAuthOptions

// export const getClientSession = useSession
// export const getServerSession = () => NextAuthGetServerSession(authOptions)

// export const login = NextAuthSignIn
// export const logout = NextAuthSingOut
