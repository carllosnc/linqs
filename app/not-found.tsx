import { LogoSymbol } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="w-full justify-center bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col items-center">

      <LogoSymbol className="fill-black max-w-[70px] h-auto dark:fill-white" />

      <div className="text-center">
        <h1 className="text-[120px] text-neutral-300 font-thin">
          404
        </h1>
        <div className="flex flex-col gap-[20px]">
          <div>
            <h2 className="title-color font-semibold">Not Found</h2>
            <p className="text-color">This page does not exist</p>
          </div>

          <Link href="/" className="link-color">
            Back to home →
          </Link>
        </div>
      </div>
    </main>
  )
}