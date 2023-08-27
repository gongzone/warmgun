interface Nav {
  title: string
  href: string
  icon?: React.ReactNode
  enum?: string
}

const navs = {
  main: [{ title: "아티클", href: "/story" }] satisfies Nav[],
}

export { type Nav, navs }
