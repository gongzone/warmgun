export type Me = {
  username: string
  email: string
  profile: {
    nickname: string
    field: string
    avatar: string | null
  }
} | null
