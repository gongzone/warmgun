import { Logo } from './vectors'
import HamburgerMenu from './HamburgerMenu'
import ProfileLogo from './ProfileLogo'
import ProfileDropdown from './ProfileDropdown'

export default function Header() {
  return (
    <header className="h-24 border-b-stone-700 border-b p-5 flex justify-between items-center">
      <Logo width={200} />
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
