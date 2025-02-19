"use client"

import { LogoHorizontal } from "@/components/logo";
import Link from "next/link";
import { File, Lock } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher"
import { redirect, useParams } from "next/navigation";
import { useGetProfileById } from "@/hooks/use-get-profile-by-user-id";
import { LinksLoading } from "@/components/links/links-loading";
import { upperFirst } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ProfilePage() {
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useGetProfileById(params.id)

  if (isLoading) {
    return LinksLoading()
  }

  if (data?.profile === null) {
    return redirect('/not-found')
  }

  return (
    <main className="w-full page-bg min-h-screen flex flex-col gap-[30px] items-center justify-center">
      <div className="min-h-screen px-[20px] py-[50px] bg-center w-full max-w-[450px] flex flex-col gap-[20px] items-center justify-center">

        <header className="flex w-full max-w-[360px] flex-col gap-[10px] items-center justify-center">
          <Avatar>
            <AvatarImage
              className="w-8 h-8 rounded-full"
              src={data?.profile.avatar_url!}
            />
            <AvatarFallback className="bg-black dark:bg-neutral-300 text-white rounded-full dark:text-neutral-800 w-[34px] h-[34px] font-bold flex items-center justify-center text-xs">
              {data?.profile?.full_name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="title-color font-bold">
            { upperFirst(data?.profile.full_name!) }
          </h1>
          <ThemeSwitcher />
        </header>

        <div className="w-full card-block flex flex-col gap-[10px] max-w-[360px]">
          {data?.pages.map((page, index) => {
            if (page.is_public) {
              return (
                <Link
                  prefetch={false}
                  className="text-color text-sm items-center hover:underline flex gap-[10px]"
                  href={`/links/${page.id}`}
                  key={index}>
                  <File size={15} />
                  <span> { upperFirst(page.title!) } </span>
                </Link>
              )
            } else {
              return (
                <Link
                  prefetch={false}
                  className="danger-color text-sm items-center hover:underline flex gap-[10px]"
                  href={`/links/${page.id}`}
                  key={index}>
                  <Lock size={15} />
                  <span> { upperFirst(page.title!) } </span>
                </Link>
              )
            }
          })}
        </div>

        <Link prefetch={false} href="/" className="link-color text-sm">
          Go to home →
        </Link>

        <div className="px-[20px] pt-[20px] w-full">
          <LogoHorizontal className="fill-neutral-400 m-auto w-full max-w-[150px] h-auto dark:fill-neutral-700" />
        </div>
      </div>
   </main>
  )
}