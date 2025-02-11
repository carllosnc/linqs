"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useGetPagesByUserId } from "@/hooks/use-get-pages-by-user-id";
import { useGetProfile } from "@/hooks/use-get-profile";
import Link from "next/link";
import { File, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

type Props = {
  userId: string;
};

export function LinksSheet({ userId }: Props) {
  const { pages, loadingPages } = useGetPagesByUserId(userId)
  const { profile, loadingProfile } = useGetProfile(userId)

  function firstName(name: string) {
    let firstName = name.split(' ')[0]
    firstName = firstName.substring(0, 6)

    return firstName
  }

  if(profile == undefined) {
    return <Spinner size="sm" />
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-color flex gap-[10px]" variant="outline" size="sm">
          <MenuIcon size={15} />
          <span>{firstName(profile.full_name!)}' Pages</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[300px] no-scrollbar md:!max-w-[260px] overflow-y-auto">
        <SheetHeader className="text-left">

          <div className="flex flex-col justify-center items-center gap-[10px] pb-[20px] mb-[20px] border-b border-color">
            <Avatar>
              <AvatarImage
                className="w-12 h-12 rounded-full"
                src={profile?.avatar_url!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <SheetTitle className="text-sm text-center title-color">
              {profile?.full_name}'s pages
            </SheetTitle>
          </div>

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