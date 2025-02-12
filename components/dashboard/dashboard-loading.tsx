import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Spinner } from "@/components/ui/spinner";

export function DashboardLoading() {
  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <DashboardHeader />

        <div className="flex justify-center items-center">
          <Spinner />
        </div>

      <DashboardFooter />
    </main>
  )
}