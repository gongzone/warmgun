import { Logo } from './vectors'
import HamburgerMenu from './HamburgerMenu'
import ProfileLogo from './ProfileLogo'
import ProfileDropdown from './ProfileDropdown'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-24 border-b-stone-700 border-b p-5 flex justify-between items-center">
      <Link className="px-2 py-4" href="/">
        <Logo width={200} />
      </Link>
      <div className="flex items-center gap-2">
        <HamburgerMenu />
        <div className="relative">
          <ProfileLogo />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}
