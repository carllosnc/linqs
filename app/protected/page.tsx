import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "@/database.types";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNewPage } from "@/components/dashboard/dashboard-new-page";
import { DashboardListPages } from "@/components/dashboard/dashboard-list-pages";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const pagesRequest = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const pages = pagesRequest.data as Tables<'pages'>[]

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <DashboardHeader />

      <section className="bg-white dark:bg-neutral-900 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <DashboardNewPage pages={pages} />
        <DashboardListPages pages={pages} />
      </section>

      <DashboardFooter />
    </main>
  );
}
