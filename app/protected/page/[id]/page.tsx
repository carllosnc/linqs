import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardNewLink } from "@/components/dashboard/dashboard-new-link";
import { createClient } from "@/utils/supabase/server";
import { DashboardListLinks } from "@/components/dashboard/dashboard-list-links";
import { Tables } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default async function SinglePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params

  const singlePageRequest = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  const singlePageData = singlePageRequest.data as Tables<'pages'>

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
        <div className="px-4 py-4 border-b border-color justify-between items-center flex gap-[10px]">
          <div className="flex items-center gap-[20px]">
            <Button variant="outline" size="icon">
              <Link href="/protected">
                <ChevronLeft />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  All pages
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-[400px]">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <div className="flex flex-col">
              <h2 className="title-color font-bold">{singlePageData.title}</h2>
              <p className="text-sm text-color">{singlePageData.descriptions}</p>
            </div>
          </div>
        </div>

        <DashboardNewLink page={singlePageData} pageId={id} />
        <DashboardListLinks links={linksData} />
      </section>

      <DashboardFooter />
    </main>
  );
}

