"use client"

import { Spinner } from "@/components/ui/spinner";

export function DashboardLoading() {
  return (
    <main className="w-full bg-neutral-100 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <div className="w-full min-h-screen max-w-[900px] border-x border-color m-auto flex flex-col gap-[20px] justify-center items-center">
        <Spinner />
      </div>
    </main>
  )
}