import { AdapterUser } from "@auth/core/adapters"
import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: "USER" | "ADMIN"
  }
  interface Session extends DefaultSession {
    user?: User
  }
}
