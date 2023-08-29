interface Article {
  id: number
  title: string
  excerpt: string
  thumbnail: string | null
  user: {
    nickname: string
    avatar: string | null
  }
}

export { type Article }
