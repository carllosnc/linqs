import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { LogoSymbol, LogoHorizontal } from "@/components/logo"
import { LinksLinkList } from "@/components/links/links-list";
import { redirect } from 'next/navigation'

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

  return (
    <main className="w-full bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col gap-[20px] items-center">
      <section className="flex flex-col gap-[20px] justify-between items-center w-full max-w-[400px]">
        <LogoSymbol className="fill-black max-w-[50px] h-auto dark:fill-white" />
        <div className="text-center flex flex-col gap-[2px]">
          <h1 className="text-[20px] title-color font-bold">
            {singlePageData.title}
          </h1>
          <span className="text-color"> {singlePageData.descriptions} </span>
        </div>
      </section>

      <hr className="w-full h-[1px] border-color" />

      <div className="w-full">
        <LinksLinkList email="carllosnc@gmail.com" userId={userId as string} links={linksData} />
      </div>

      <div className="px-[20px] mt-[60px] w-full">
        <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[200px] h-auto dark:fill-neutral-800" />
      </div>
    </main>
  );
}