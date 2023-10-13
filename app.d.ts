/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lib/auth").Auth
  type DatabaseUserAttributes =
    import("./src/lib/db/types/user").UserWithProfile
  type DatabaseSessionAttributes = {}
}
