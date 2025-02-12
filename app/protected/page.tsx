"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNewPage } from "@/components/dashboard/dashboard-new-page";
import { DashboardListPages } from "@/components/dashboard/dashboard-list-pages";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { useGetPages } from "@/hooks/use-get-pages";

export default function ProtectedPage() {
  const { data, isLoading } = useGetPages()

  if (isLoading) {
    return (
      <DashboardLoading />
    )
  }

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <DashboardHeader />

      <section className="bg-white dark:bg-neutral-900 min-h-[87vh] border-x m-auto border-color w-full max-w-[900px]">
        <DashboardNewPage pages={data?.pages!} userId={data?.user?.id!} />
        <DashboardListPages pages={data?.pages!} />
      </section>

      <DashboardFooter />
    </main>
  );
}
