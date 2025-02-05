import Link from "next/link";
import { LogoVertical } from "@/components/logo"

export function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex p-4 flex-col w-full min-h-screen gap-[30px] bg-neutral-50 dark:bg-neutral-950 justify-center items-center">
      <Link href="/" >
        <LogoVertical className="w-[100px] h-auto fill-black dark:fill-white" />
      </Link>

      { children }

      <Link className="link-color text-sm" href="/" >
       Back to home page →
      </Link>
    </main>
  )
}

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 w-full max-w-[500px] p-6 rounded-lg bg-white dark:bg-neutral-900 dark:shadow-none shadow-2xl shadow-neutral-200">
      { children }
    </div>
  )
}

export function AuthHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-2">
      { children }
    </div>
  )
}

export function AuthTitle({ children }: { children: string }) {
  return (
    <h1 className="text-[16px] tracking-widest font-bold uppercase title-color">
      {children}
    </h1>
  )
}

export function AuthSubtitle(
  {text, linkTitle, href}:
  {text: string, linkTitle: string, href: string}
){
  return (
    <p className="flex gap-[5px] text-color text-sm">
      <span> {text } </span> <span>
        <Link className="link-color" href={href}>
          {linkTitle}
        </Link>
      </span>
    </p>
  )
}

export function AuthContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full gap-[20px]">
      { children }
    </div>
  )
}