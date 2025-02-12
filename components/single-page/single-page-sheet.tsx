import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useGetPages } from "@/hooks/use-get-pages";
import Link from "next/link";
import { File } from "lucide-react";

export function SinglePageSheet(){
  const { data, isLoading } = useGetPages()

  if (isLoading) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-color" variant="outline">
          Pages
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[280px] no-scrollbar overflow-y-auto">
        <SheetHeader className="text-left flex flex-col gap-[10px]">
          <SheetTitle className="text-md">Your pages</SheetTitle>

          <hr />

          <div className="flex flex-col gap-[14px]">
            {
              data?.pages.map((page, index) => {
                return (
                  <Link prefetch={false} className="text-sm title-color items-center hover:underline flex gap-[10px] truncate" href={`/protected/page/${page.id}`} key={index}>
                    <File className="w-[16px] h-[16px] text-color min-h-[16px] min-w-[16px]" />
                    <p className="truncate">{page.title}</p>
                  </Link>
                )
              })
            }
          </div>

        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}