"use client"

import { Button } from "@/components/ui/button";
import { SinglePageSheet } from "@/components/single-page/single-page-sheet"
import { Tables } from "@/database.types";
import { ChevronLeft, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { SinglePageNewLinkButton } from "./single-page-new-link-button";
import { SinglePageDeleteButton } from './single-page-delete-button'

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function SinglePageToolbar({ pageId, page }: Props) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-color">
      <div className="flex items-center gap-[20px]">
        <Button variant="outline" size="icon">
          <Link href="/protected">
            <ChevronLeft size={20} />
          </Link>
        </Button>

        <SinglePageSheet />

        <SinglePageNewLinkButton pageId={pageId} page={page} />
      </div>

      <div className="flex gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <span className="text-color"> Public </span>
          <Switch />
        </div>

        <Link target="_blank" href={`/links/${pageId}`}>
          <Button size="icon" variant="outline">
            <Globe size={20} />
          </Button>
        </Link>

        <SinglePageDeleteButton pageId={pageId} page={page} />

      </div>
    </div>
  )
}
