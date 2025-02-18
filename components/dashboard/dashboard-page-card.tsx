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
      className="card-block card-linkable flex justify-between items-center">

      <div className="flex gap-[15px] items-center">
        <File className="text-neutral-400 dark:text-neutral-600 w-[25px] h-[25px]"/>

        <div className="flex flex-col gap-[3px] w-full">
          <div className="flex  gap-[10px] items-center">
            {
              wasCreatedToday(page.created_at)
              && <Badge className="bg-black dark:bg-white dark:text-black rounded-sm px-[6px] text-center h-[20px] text-white"> New </Badge>
            }
            <h2 className="text-[16px] font-semibold title-color">
              { upperFirst(page.title!) }
            </h2>
          </div>

          {
            page.description
              ? <span className="text-color"> → { page.description } </span>
              : <span className="text-color"> → No description</span>
          }

          <small className="text-color"> { formatDate(page.created_at) } </small>
        </div>
      </div>

      <ChevronRight className="w-[20px] h-[20px] opacity-35" />
    </Link>
  )
}