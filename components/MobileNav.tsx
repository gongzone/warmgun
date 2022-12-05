'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import shallow from 'zustand/shallow'

import useMobileNavStore from '../stores/mobile-nav'

const navItems = [
  { name: '홈으로', description: '', to: '/' },
  {
    name: 'Articles',
    description: '생생한 개발 이야기',
    to: '/articles',
  },
  {
    name: 'Warriors',
    description: '데브 워리어들의 블로그 탐방',
    to: '/writers',
  },
]

export default function MobileNav() {
  const router = useRouter()
  const [isOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <div className="relative">
      <nav
        className={`w-full absolute top-0 left-0 z-30 overflow-y-auto bg-[#111] transition-all duration-300 ${
          isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-10'
        }`}
      >
        <ul>
          {navItems.map((item) => (
            <li className="flex items-center gap-4 border-b border-b-stone-700" key={item.name}>
              <Link
                className="w-full h-full px-6 py-8 "
                onClick={(e) => {
                  e.preventDefault()
                  toggleMobileNav()
                  router.push(item.to)
                }}
                href={item.to}
              >
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-sm text-zinc-400">{item.description}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
