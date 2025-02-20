import { Skeleton } from "../ui/skeleton";

export function LinksLoading() {
  return (
    <main className="w-full px-[20px] py-[20px] page-bg min-h-screen flex flex-col justify-center items-center gap-[30px]">
      <div className="w-full max-w-[550px] flex flex-col gap-[20px] m-auto">
        <Skeleton className="card-block bg-white h-[30px] max-w-[400px]" />
        <Skeleton className="card-block bg-white h-[30px] w-full" />
        <Skeleton className="card-block bg-white h-[200px] w-full" />
        <Skeleton className="card-block bg-white h-[200px] w-full" />
        <Skeleton className="card-block bg-white h-[200px] w-full" />
        <Skeleton className="card-block bg-white h-[200px] w-full" />
        <Skeleton className="card-block bg-white h-[200px] w-full" />
      </div>
    </main>
  )
}