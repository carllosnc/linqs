import Link from "next/link";
import { ChevronRight, File } from "lucide-react";
import { Tables } from "@/types/database.types";
import { Badge } from "@/components/ui/badge";

type Props = {
  isLast: boolean,
  page: Tables<'pages'>
}

export function DashboardPageCard({ page, isLast }: Props) {
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

  function border() {
    return isLast
      ? "border-b-0 border-transparent"
      : "border-b border-color";
  }

  return (
    <Link
      href={`/protected/page/${page.id}`}
      className={`
        bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer w-full p-4 flex justify-between items-center gap-[20px] ${border()
        }
      `}>
      <div className="flex gap-[15px] items-center">
        <File className="text-neutral-400 dark:text-neutral-600 w-[25px] h-[25px]" />

        <div className="flex flex-col gap-[3px]">
          <div className="flex gap-[10px] items-center">
            {
              wasCreatedToday(page.created_at)
              && <Badge className="bg-emerald-600 h-[22px] text-white">New</Badge>
            }
            <h2 className="text-[17px] font-semibold title-color"> { upperFirst(page.title!) } </h2>
          </div>
          <span className="text-color"> { page.descriptions } </span>
          <small className="text-color"> { formatDate(page.created_at) } </small>
        </div>
      </div>
      <ChevronRight className="w-[20px] h-[20px] opacity-35" />
    </Link>
  )
}