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
    <main className="w-full page-bg min-h-screen flex flex-col justify-between">
      <DashboardHeader />

      <section className="p-4 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px] flex flex-col gap-[15px]">
        <DashboardNewPage pages={globalPages} userId={data?.user?.id!} />
        <DashboardListPages pages={globalPages} />
      </section>

      <DashboardFooter />
    </main>
  );
}
