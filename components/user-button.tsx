"use client"

import { useGetSession } from "@/hooks/use-get-session"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Spinner } from "@/components/ui/spinner";

export function UserButton() {
  const router = useRouter()
  const { data, isLoading } = useGetSession()

  if (isLoading) {
    return <Spinner size="sm" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            className="w-8 h-8 rounded-full"
            src={data?.session?.user.user_metadata?.avatar_url}
          />
          <AvatarFallback className="bg-black dark:bg-neutral-300 text-white rounded-full dark:text-neutral-800 w-[34px] h-[34px] font-bold flex items-center justify-center text-xs">
              {data?.session?.user?.user_metadata?.full_name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {data?.session?.user.user_metadata?.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          {data?.session?.user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => {
          await createClient().auth.signOut();
          router.push("/sign-in");
        }} className="text-sm text-red-500">
          Exit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}