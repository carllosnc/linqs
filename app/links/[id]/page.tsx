import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { LogoSymbol, LogoHorizontal } from "@/components/logo"
import { LinksLinkList } from "@/components/links/links-list";
import { redirect } from 'next/navigation'
import { Lock } from "lucide-react"
import { LinksSheet } from "@/components/links/links-sheet";
import Link from "next/link";

export default async function PublicPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params

  const singlePageRequest = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  const singlePageData = singlePageRequest.data as Tables<'pages'>

  if (singlePageData === null) {
    return redirect("/not-found");
  }

  const userId = singlePageData.user_id

  const linksRequest = await supabase
    .from("links")
    .select("*")
    .eq("page_id", id)
    .order("created_at", { ascending: false });

  const linksData = linksRequest.data as Tables<'links'>[]

  const profileRequest = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const profileData = profileRequest.data as Tables<'profiles'>

  if (!singlePageData.isPublic) {
    return (
      <main className="w-full bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col gap-[30px] items-center justify-center">
        <Lock size={50} className="text-neutral-300 dark:text-neutral-800" />

        <h1 className="text-color text-center text-[22px]">
          This page is private
        </h1>

        <LinksSheet userId={userId as string} />

        <Link href="/" className="link-color">
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
    <main className="w-full bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col gap-[30px] items-center">
      <section className="flex flex-col gap-[20px] justify-between items-center w-full max-w-[400px]">
        <Link href="/">
          <LogoSymbol className="fill-black max-w-[50px] h-auto dark:fill-white" />
        </Link>

        <div className="text-center flex flex-col gap-[5px]">
          <h1 className="text-[20px] title-color font-bold">
            {singlePageData.title}
          </h1>
          {
            singlePageData.descriptions &&
            <span className="text-color"> {singlePageData.descriptions} </span>
          }
        </div>
      </section>

      <hr className="w-full h-[1px] border-color border-dashed" />

      <div className="w-full">
        <LinksLinkList email="carllosnc@gmail.com" userId={userId as string} links={linksData} />
      </div>

      <Link href={`/profile/${profileData.id}`} className="link-color">
        by {profileData.full_name}
      </Link>

      <div className="px-[20px] w-full">
        <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[200px] h-auto dark:fill-neutral-800" />
      </div>
    </main>
  );
}