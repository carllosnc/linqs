import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardPageToolbar } from "@/components/dashboard/dashboard-page-toolbar";
import { createClient } from "@/utils/supabase/server";
import { DashboardListLinks } from "@/components/dashboard/dashboard-list-links";
import { Tables } from "@/database.types";
import { redirect } from "next/navigation";

export default async function SinglePage({ params }: { params: { id: string } }) {
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

  const linksRequest = await supabase
    .from("links")
    .select("*")
    .eq("page_id", id)
    .order("created_at", { ascending: false });

  const linksData = linksRequest.data as Tables<'links'>[]

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col">
      <DashboardHeader />

      <section className="bg-white dark:bg-neutral-900 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <div className="px-4 py-4 border-b border-color justify-between items-center flex flex-col gap-[5px]">
          <h2 className="title-color text-[18px] max-w-[500px] text-center font-semibold">{singlePageData.title}</h2>
          <p className="text-sm text-color text-center max-w-[500px] truncate">{singlePageData.descriptions}</p>
        </div>

        <DashboardPageToolbar page={singlePageData} pageId={id} />
        <DashboardListLinks links={linksData} />
      </section>

      <DashboardFooter />
    </main>
  );
}

