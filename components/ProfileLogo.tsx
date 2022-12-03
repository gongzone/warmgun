'use client'
import { SkullIcon } from './vectors'

import useProfileDropdownStore from '../stores/profile-dropdown'
import shallow from 'zustand/shallow'

export default function ProfileLogo() {
  const [isOpen, toggleProfileDropdown] = useProfileDropdownStore(
    (state) => [state.isOpen, state.toggleProfileDropdown],
    shallow,
  )

  return (
    <button
      onClick={toggleProfileDropdown}
      className={`rounded-full border-2 h-10 w-10 border-zinc-600 hover:border-zinc-400 ${
        isOpen ? 'border-zinc-400' : ''
      }`}
    >
      <SkullIcon width={35} height={35} />
    </button>
  )
}
