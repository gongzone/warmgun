import Link from 'next/link'
import Image from 'next/image'
import homeImage from '../assets/home.png'
import articleImage from '../assets/article.png'
import warriorImage from '../assets/warrior.png'

const navItems = [
  { name: '홈으로', description: '', image: homeImage, to: '/' },
  {
    name: 'Articles',
    description: '데브 워리어들의 치열한 개발 이야기',
    image: articleImage,
    to: '/articles',
  },
  {
    name: 'Warriors',
    description: '데브 워리어들의 블로그 탐방',
    image: warriorImage,
    to: '/writers',
  },
]

export default function MobileNav() {
  return (
    <nav className="">
      <ul>
        {navItems.map((item) => (
          <Link href={item.to} key={item.name}>
            <li className="px-6 py-8 flex items-center gap-4 border-b border-b-stone-700">
              <div className="">
                <Image src={item.image} alt="article-img" width={30} height={30} />
              </div>
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span className="text-sm text-zinc-400">{item.description}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}
