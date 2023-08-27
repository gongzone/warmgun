import Link from "next/link"

import { navs } from "@/lib/constants/navs"
import { textVariants } from "@/components/@ui/text"

const MainNav = () => {
  return (
    <nav>
      <ul className="hidden md:flex md:items-center md:gap-6">
        {navs.main.map((nav) => (
          <li key={nav.title}>
            <Link
              href={nav.href}
              className={textVariants({
                color: "light",
                size: "sm",
                weight: 600,
                hover: true,
              })}
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { MainNav }
