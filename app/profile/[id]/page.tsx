import { LogoHorizontal } from "@/components/logo";
import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { File, Lock } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher"

export default async function ProfilePage({params}: {params: {id: string}}) {
   const supabase = await createClient();
   const { id } = await params

  const profileRequest = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  const profileData = profileRequest.data as Tables<'profiles'>

  const pagesRequest = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  const pagesData = pagesRequest.data as Tables<'pages'>[]

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col gap-[30px] items-center justify-center">
      <div className="min-h-screen px-[20px] py-[50px] bg-center w-full max-w-[450px] flex flex-col gap-[20px] items-center justify-center">

        <header className="flex w-full max-w-[360px] flex-col gap-[10px] items-center justify-center">
          <img
            src={profileData.avatar_url!}
            alt="avatar"
            className="w-full max-w-[60px] h-auto rounded-full"
          />
          <h1 className="title-color font-bold"> {profileData.full_name} </h1>
          <ThemeSwitcher />
        </header>

        <div className="w-full flex flex-col gap-[10px] max-w-[360px] bg-white dark:bg-neutral-900 border border-color rounded-xl shadow-2xl shadow-neutral-200 p-6 dark:shadow-none">
          {pagesData.map((page, index) => {
            if (page.isPublic) {
              return (
                <Link
                  className="text-color items-center hover:underline flex gap-[10px]"
                  href={`/links/${page.id}`}
                  key={index}>
                  <File size={15} />
                  <span> {page.title} </span>
                </Link>
              )
            } else {
              return (
                <Link
                  className="danger-color items-center hover:underline flex gap-[10px]"
                  href={`/links/${page.id}`}
                  key={index}>
                  <Lock size={15} />
                  <span> {page.title} </span>
                </Link>
              )
            }
          })}
        </div>

        <Link href="/" className="link-color">
          Go to home →
        </Link>

        <div className="px-[20px] pt-[20px] w-full">
          <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[150px] h-auto dark:fill-neutral-800" />
        </div>
      </div>
   </main>
  )
}