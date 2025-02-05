"use client"

import { useRealtimePages } from "@/hooks/use-realtime-pages";
import { Tables } from "@/types/database.types";
import { DashboardPageCard } from "@/components/dashboard/dashboard-page-card";
import { Input } from "@/components/ui/input";
import { ListFilter, TriangleAlert } from "lucide-react"
import { useState } from "react";

type Props = {
  pages: Tables<'pages'>[]
}

export function DashboardListPages({ pages }: Props) {
  const listOfPages = useRealtimePages(pages);
  const [filter, setFilter] = useState("");

  const filterPages = (page: Tables<'pages'>) => {
    return page.title!.toLowerCase().includes(filter.toLowerCase());
  };

  const filteredPages = listOfPages.filter(filterPages);

  return (
    <section>
      <header className="px-4 bg-white dark:bg-neutral-900 py-6 flex items-center gap-[20px] border-b border-color">
        <ListFilter className="w-[30px] h-[30px]" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter page by name"
        />
      </header>
      <div>
        {filteredPages.length > 0 ? (
          filteredPages.map((page, index) => (
            <DashboardPageCard
              isLast={index === filteredPages.length - 1}
              page={page}
              key={page.id}
            />
          ))
        ) : (
          <div className="flex h-[200px] p-4 gap-[10px] flex-col items-center justify-center">
            <TriangleAlert className="w-[30px] h-[30px] text-neutral-300 dark:text-neutral-800" />
            <p className="text-center text-color">No one page found</p>
          </div>
        )}
      </div>
    </section>
  )
}
