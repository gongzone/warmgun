/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lib/auth").Auth
  type DatabaseUserAttributes = {
    username: string
    email: string | null
    avatar: string
    role: "USER" | "ADMIN"
  }
  type DatabaseSessionAttributes = {}
}
