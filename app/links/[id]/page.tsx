"use client"

import { LogoSymbol, LogoHorizontal } from "@/components/logo"
import { LinksList } from "@/components/links/links-list";
import { LinksSheet } from "@/components/links/links-sheet";
import { Lock } from "lucide-react"
import { useParams } from "next/navigation";
import { useGetLinks } from "@/hooks/use-get-links";
import Link from "next/link";
import { LinksLoading } from "@/components/links/links-loading";
import { upperFirst } from "@/lib/utils";

export default function PublicPage() {
  const params = useParams<{ id: string }>()
  const { isLoading, data } = useGetLinks(params.id)

  if (isLoading) {
    return <LinksLoading />
  }

  if (!data?.page.is_public) {
    return (
      <main className="w-full page-bg min-h-screen flex flex-col gap-[30px] items-center justify-center">
        <Lock size={50} className="text-neutral-300 dark:text-neutral-800" />

        <h1 className="text-color text-center text-[22px]">
          This page is private
        </h1>

        <LinksSheet userId={data?.page.user_id as string} />

        <Link prefetch={false} href="/" className="link-color">
          Go to home →
        </Link>

        <div className="px-[20px]">
          <LogoHorizontal
            className="fill-neutral-300 m-auto w-full max-w-[230px] h-auto dark:fill-neutral-800"
          />
        </div>
      </main>
    )
  }

  return (
    <main className="w-full page-bg py-[25px] min-h-screen flex flex-col gap-[25px] items-center">
      <section className="flex items-center sm:flex-col px-[20px] gap-[20px] w-full max-w-[590px]">
        <Link prefetch={false} href="/">
          <LogoSymbol className="fill-black max-w-[30px] h-auto dark:fill-white" />
        </Link>

        <div className="flex flex-col sm:text-center">
          <h1 className="text-[18px] title-color font-bold">
            { upperFirst(data?.page.title!) }
          </h1>
          {
            data?.page.description &&
            <span className="text-color">
              {upperFirst(data?.page.description)}
            </span>
          }
        </div>
      </section>

      <hr className="w-full h-[1px] border-t border-neutral-300 border-dashed dark:border-neutral-800" />

      <div className="w-full">
        <LinksList
          email="carllosnc@gmail.com"
          userId={data?.page.user_id!}
          links={data?.links!}
        />
      </div>

      <Link href={`/profile/${data?.profile.id}`} prefetch={false} className="link-color text-sm">
        by {data?.profile.full_name}
      </Link>

      <div className="px-[20px] w-full">
        <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[200px] h-auto dark:fill-neutral-800" />
      </div>
    </main>
  );
}

