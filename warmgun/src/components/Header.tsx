import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";

import Logo from "~/@ui/Logo";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-base-100 px-[5vw] py-6 shadow-lg">
      <div className="flex items-center gap-3">
        <HamburgerButton />
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div>
        <AvatarButton />
      </div>
    </header>
  );
};

export default Header;

const HamburgerButton: React.FC = () => {
  return (
    <button className="btn-outline btn-circle btn border-2">
      <Bars3Icon className="h-6 w-6" />
    </button>
  );
};

const AvatarButton: React.FC = () => {
  return (
    <button className="btn-outline btn-circle btn border-2">
      <UserIcon className="h-7 w-7" />
    </button>
  );
};
