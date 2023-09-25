import { getServerSession as NextAuthGetServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"

import { authOptions } from "./auth-options"

export const getClientSession = useSession

export const getServerSession = () => NextAuthGetServerSession(authOptions)
