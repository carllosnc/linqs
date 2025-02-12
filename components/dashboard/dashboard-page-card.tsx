import Link from "next/link";
import { ChevronRight, File } from "lucide-react";
import { Tables } from "@/database.types";
import { Badge } from "@/components/ui/badge";

type Props = {
  page: Tables<'pages'>
}

export function DashboardPageCard({ page }: Props) {
  function formatDate(date: string) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return formatter.format(new Date(date));
  }

  function upperFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function wasCreatedToday(date: string) {
    const today = new Date();
    const dateToCompare = new Date(date);

    return (
      today.getFullYear() === dateToCompare.getFullYear() &&
      today.getMonth() === dateToCompare.getMonth() &&
      today.getDate() === dateToCompare.getDate()
    );
  }

  return (
    <Link
      href={`/protected/page/${page.id}`}
      className="bg-white dark:bg-neutral-900 border-b border-color hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer w-full p-4 flex justify-between items-center gap-[20px]">

      <div className="flex gap-[15px] items-center">
        <File className="text-neutral-400 dark:text-neutral-600 w-[25px] h-[25px]" />

        <div className="flex flex-col gap-[3px] w-full max-w-[7 00px]">
          <div className="flex gap-[10px] items-center">
            {
              wasCreatedToday(page.created_at)
              && <Badge className="bg-emerald-600 rounded-sm h-[22px] text-white">New</Badge>
            }
            <h2 className="text-[16px] font-semibold title-color truncate">
              { upperFirst(page.title!) }
            </h2>
          </div>

          {
            page.descriptions &&
            <span className="text-color truncate"> → { page.descriptions } </span>
          }

          <small className="text-color"> { formatDate(page.created_at) } </small>
        </div>
      </div>

      <ChevronRight className="w-[20px] h-[20px] opacity-35" />
    </Link>
  )
}