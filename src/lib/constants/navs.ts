interface Nav {
  title: string
  href: string
  icon?: React.ReactNode
  enum?: string
}

const navs = {
  main: [
    { title: "아티클", href: "/article" },
    { title: "커뮤니티", href: "/community" },
  ] satisfies Nav[],
}

export { type Nav, navs }
