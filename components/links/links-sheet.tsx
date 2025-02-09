"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useGetPagesById } from "@/hooks/use-get-pages-by-id";
import { useGetProfile } from "@/hooks/use-get-profile";
import Link from "next/link";
import { File, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  userId: string;
};

export function LinksSheet({ userId }: Props) {
  const { pages } = useGetPagesById(userId)
  const { profile } = useGetProfile(userId)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-color" variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[300px] no-scrollbar md:!max-w-[260px] overflow-y-auto">
        <SheetHeader className="text-left">

          <Avatar>
            <AvatarImage
              className="w-12 h-12 rounded-full"
              src={profile?.avatar_url!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <SheetTitle className="mb-[15px] text-sm">{profile?.full_name}'s pages </SheetTitle>

          <br />

          <div className="flex flex-col gap-[14px]">
            {
              pages.map((page, index) => {
                return (
                  <Link className="text-sm title-color items-center hover:underline flex gap-[10px] truncate" href={`/links/${page.id}`} key={index}>
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