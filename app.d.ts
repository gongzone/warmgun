/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import(".src/lib/auth").Auth
  type DatabaseUserAttributes = {
    username: string
    avatar: string | null
  }
  type DatabaseSessionAttributes = {}
}
