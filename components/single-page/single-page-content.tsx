"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { SinglePageToolbar } from "@/components/single-page/single-page-toolbar";
import { SiglePageListLinks } from "@/components/single-page/single-page-list-links";
import { useGetSinglePage } from "@/hooks/use-get-single-page";
import { DashboardLoading } from "../dashboard/dashboard-loading";
import { redirect } from "next/navigation";

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

  if (data?.page === null) {
    return redirect('/not-found')
  }

  return (
    <main className="w-full page-bg min-h-screen flex flex-col">
      <DashboardHeader />

      <section className="flex gap-[15px] lg:border-none flex-col p-4 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <SinglePageToolbar page={data?.page!} pageId={id} />
        <SiglePageListLinks links={data?.links!} />
      </section>

      <DashboardFooter />
    </main>
  );
}

