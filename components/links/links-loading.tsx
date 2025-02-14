import { Spinner } from "@/components/ui/spinner";

export function LinksLoading() {
  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-center items-center">
        <Spinner />
    </main>
  )
}