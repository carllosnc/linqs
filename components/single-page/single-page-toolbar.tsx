"use client"

import { Button } from "@/components/ui/button";
import { SinglePageSheet } from "@/components/single-page/single-page-sheet"
import { Tables } from "@/database.types";
import { ChevronLeft, Globe } from "lucide-react";
import Link from "next/link";
import { SinglePageNewLinkButton } from "./single-page-new-link-button";
import { SinglePageDeleteButton } from './single-page-delete-button'
import { SinglePageEditButton } from "./single-page-edit-button";
import { SinglePageTogglePublic } from "./single-page-toggle-public"
import { useState } from "react";

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function SinglePageToolbar({ pageId, page }: Props) {
    const [title, setTitle] = useState<string>(page.title as string)
    const [description, setdescription] = useState<string | null>(page.description)

    return (
    <div>
      <div className="px-4 py-4 border-b border-color justify-between items-center flex flex-col">
        <h2 className="title-color text-[18px] max-w-[500px] text-center font-semibold">
          {title}
        </h2>

        {description &&
          <p className="text-sm text-color text-center max-w-[500px] truncate">
            {description}
          </p>
        }
      </div>

      <div className="flex items-center justify-between p-4 border-b border-color">
        <div className="flex items-center gap-[20px]">
          <Link prefetch={false} href="/protected">
            <Button variant="outline" size="icon">
                <ChevronLeft size={20} />
            </Button>
          </Link>

          <SinglePageSheet />
          <SinglePageNewLinkButton pageId={pageId} page={page} />
        </div>

        <div className="flex gap-[20px]">

          <SinglePageTogglePublic pageId={pageId} page={page} />

          <Link prefetch={false} target="_blank" href={`/links/${pageId}`}>
            <Button size="icon" variant="outline">
              <Globe className="w-4 h-4 text-color" />
            </Button>
          </Link>

          <SinglePageEditButton page={page} onChage={(title, description) => {
            setTitle(title as string)
            setdescription(description as string | null)
          }} />

          <SinglePageDeleteButton pageId={pageId} page={page} />
        </div>
      </div>
    </div>
  )
}
