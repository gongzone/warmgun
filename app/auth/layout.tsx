import Image from 'next/image'
import warrior from '../../assets/warrior.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <div className="mx-auto w-[200px]">
        <Image src={warrior} alt="warrior" />
      </div>
      {children}
    </div>
  )
}
