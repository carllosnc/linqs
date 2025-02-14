"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNewPage } from "@/components/dashboard/dashboard-new-page";
import { DashboardListPages } from "@/components/dashboard/dashboard-list-pages";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { usePageCrud } from "@/hooks/use-page-crud";

export default function ProtectedPage() {
  const { data, isLoading } = usePageCrud().getAllPages;
  const globalPages = usePageCrud().globalPages;

  if (isLoading) {
    return (
      <DashboardLoading />
    )
  }

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <DashboardHeader />

      <section className="bg-white dark:bg-neutral-900 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <DashboardNewPage pages={globalPages} userId={data?.user?.id!} />
        <DashboardListPages pages={globalPages} />
      </section>

      <DashboardFooter />
    </main>
  );
}
