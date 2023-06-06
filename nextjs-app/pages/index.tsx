import Image from 'next/image'
import { Inter } from 'next/font/google'
import SeoHead from '@/comps/seoHead'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <SeoHead />
      <Image alt={'Bunky Logo'} src={'/images/logo-bg-rounded.png'} width={200} height={200} />
      <br />
      <h1 className={'text-4xl font-bold text-center'}>coming soon...</h1>
    </main>
  )
}
