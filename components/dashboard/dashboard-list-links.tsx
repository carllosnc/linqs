"use client"

import { useRealtimeLinks } from "@/hooks/use-realtime-links";
import { Tables } from "@/types/database.types";
import { Input } from "@/components/ui/input";
import { ListFilter, RectangleHorizontal, Rows2, Rows4, Square, TriangleAlert } from "lucide-react"
import { useState } from "react";
import { DashboardLinkCard } from "@/components/dashboard/dashboard-link-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Props = {
  links: Tables<'links'>[]
}

export function DashboardListLinks({ links }: Props) {
  const listOfLinks = useRealtimeLinks(links);
  const [filter, setFilter] = useState("");

  const filterLinks = (link: Tables<'links'>) => {
    return link.title!.toLowerCase().includes(filter.toLowerCase());
  };

  const filteredLinks = listOfLinks.filter(filterLinks);

  return (
    <section>
      <header className="px-4 py-6 flex items-center gap-[20px] border-b border-color">
        <ListFilter className="w-[25px] h-[25px] min-w-[25px] min-h-[25px]" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter link by name"
        />

        <div className="w-full flex justify-end">
          <ToggleGroup type="single">
            <ToggleGroupItem variant="outline" value="a">
              <Rows2 />
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="b">
              <Rows4 />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>

      <div className="flex flex-col">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link, index) => (
            <DashboardLinkCard link={link} key={link.id} />
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
