import Link from "next/link";
import { LuAppWindow, LuChevronRight } from "react-icons/lu";

type PageCardProps = {
  title: string
  id: string
  links: number
}

export function PageCard({ title, links, id }: PageCardProps) {
  return (
    <Link
      href={`/dashboard/page/${id}`}
      className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer w-full border-b border-color p-4 flex justify-between items-center gap-[20px]">
      <div className="flex gap-[15px] items-center">
        <LuAppWindow className="text-zinc-400 dark:text-zinc-600 w-[20px] h-[20px]" />

        <div className="flex flex-col">
          <h2 className="font-bold title-color"> { title } </h2>
          <small className="text-color"> { links } links </small>
        </div>
      </div>
      <LuChevronRight className="w-[20px] h-[20px] opacity-35" />
    </Link>
  )
}