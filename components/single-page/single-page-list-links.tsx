"use client"

import { useRealtimeLinks } from "@/hooks/use-realtime-links";
import { Tables } from "@/database.types";
import { Input } from "@/components/ui/input";
import { ListFilter, TriangleAlert } from "lucide-react"
import { useState } from "react";
import { SinglePageLinkCard } from "@/components/single-page/single-page-link-card";

type Props = {
  links: Tables<'links'>[]
}

export function SiglePageListLinks({ links }: Props) {
  const listOfLinks = useRealtimeLinks(links);
  const [filter, setFilter] = useState("");

  const filterLinks = (link: Tables<'links'>) => {
    return link.url!.toLowerCase().includes(filter.toLowerCase());
  };

  const filteredLinks = listOfLinks.filter(filterLinks);

  return (
    <section className="flex flex-col gap-[15px]">
      <header className="card-block flex gap-4 items-center">
        <ListFilter className="w-[25px] h-[25px] min-w-[25px] min-h-[25px]" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter link by name"
        />
      </header>

      <div className="flex flex-col gap-[15px]">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link, index) => (
            <SinglePageLinkCard link={link} key={link.id} />
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
