"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { SinglePageToolbar } from "@/components/single-page/single-page-toolbar";
import { SiglePageListLinks } from "@/components/single-page/single-page-list-links";
import { useGetSinglePage } from "@/hooks/use-get-single-page";
import { DashboardLoading } from "../dashboard/dashboard-loading";

type Props = {
  id: string
}

export default function SinglePageContent({id}: Props) {
  const { data, isLoading } = useGetSinglePage(id)

  if (isLoading) {
    return (
      <DashboardLoading />
    )
  }

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col">
      <DashboardHeader />

      <section className="bg-white dark:bg-neutral-900 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <SinglePageToolbar page={data?.page!} pageId={id} />
        <SiglePageListLinks links={data?.links!} />
      </section>

      <DashboardFooter />
    </main>
  );
}

