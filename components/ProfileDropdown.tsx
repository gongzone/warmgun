'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import shallow from 'zustand/shallow'
import useProfileDropdownStore from '../stores/profile-dropdown'
import { Skeleton } from './vectors'

export default function ProfileDropdown() {
  const router = useRouter()
  const [isOpen, toggleProfileDropdown] = useProfileDropdownStore(
    (state) => [state.isOpen, state.toggleProfileDropdown],
    shallow,
  )

  return (
    <div
      className={`absolute z-40 -translate-x-[100%] translate-y-[15px] left-[40px] ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="absolute w-4 h-4 rotate-45 bg-[#242526] -translate-y-[50%] right-[12px] border-t border-l border-zinc-600"></div>
      <div className="flex flex-col gap-2 p-2 w-[250px] h-[300px] bg-[#242526] rounded-lg shadow-md border-zinc-600 border">
        <div className="flex justify-center itmes-center">
          <Skeleton width={160} height={160} />
        </div>
        <span className="text-lg text-center">Join Us!</span>
        <div className="flex flex-col justify-center items-center h-full">
          <Link
            className="py-2 px-8 bg-slate-700 rounded-3xl text-sm"
            onClick={(e) => {
              e.preventDefault()
              toggleProfileDropdown()
              router.push('/auth')
            }}
            href="/auth"
          >
            로그인 / 회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}
