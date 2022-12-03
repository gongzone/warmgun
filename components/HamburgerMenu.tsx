'use client'
import shallow from 'zustand/shallow'

import useMobileNavStore from '../stores/mobile-nav'

export default function HamburgerMenu() {
  const [isOpen, toggleMobileNav] = useMobileNavStore(
    (state) => [state.isOpen, state.toggleMobileNav],
    shallow,
  )

  return (
    <button
      onClick={toggleMobileNav}
      className="border-2 border-zinc-600 h-10 w-10 relative rounded-full transition-colors duration-150 hover:border-zinc-400"
    >
      <span
        className={`hamburger-line ${
          isOpen ? '-translate-x-1/2 -translate-y-1/2 -rotate-[315deg] top-[50%]' : 'top-[30%]'
        }`}
      ></span>
      <span className={`hamburger-line ${isOpen ? 'opacity-0' : ''}`}></span>
      <span
        className={`hamburger-line ${
          isOpen ? '-translate-x-1/2 -translate-y-1/2 -rotate-[225deg] top-[50%]' : 'top-[70%]'
        }`}
      ></span>
    </button>
  )
}
