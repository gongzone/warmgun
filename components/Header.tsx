import { Logo } from './vectors'

export default function Header() {
  return (
    <header className="h-24 border-b-stone-700 border-b p-5 flex items-center">
      <Logo width={200} />
    </header>
  )
}
