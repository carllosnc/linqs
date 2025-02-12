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
          src={data?.user?.user_metadata?.avatar_url}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {data?.user?.user_metadata?.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          {data?.user?.email}
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