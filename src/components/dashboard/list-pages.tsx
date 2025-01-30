"use client"

import { useListPages } from "@/db-actions/use-list-pages"
import { PageCard } from "@/components/dashboard/page-card"
import { Spinner } from "@/components/spinner"
import { useAtom } from "jotai"
import { atomPages, atomPagesLoading } from "@/atoms/page-atoms"

export function ListPages(){
  useListPages()

  const [pages] = useAtom(atomPages)
  const [loading] = useAtom(atomPagesLoading)

  if (loading) {
    return <div className="w-full p-4 flex justify-center items-center">
      <Spinner color="base" size="md" />
    </div>
  }

  console.log(pages)

  return (
    <div className="flex flex-col">
      {pages.map((page) => (
        <PageCard
          id={String(page.id)}
          key={page.id}
          title={page.name}
          links={page.numberOfLinks || 0}
        />
      ))}
    </div>
  )
}