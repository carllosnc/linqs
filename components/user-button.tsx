"use client"

import { useGetUser } from "@/hooks/use-get-user"
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

export function UserButton() {
  const router = useRouter()
  const { user, loading } = useGetUser()

  if (loading) {
    return <></>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>

      <Avatar>
        <AvatarImage
          className="w-8 h-8 rounded-full"
          src={user?.user_metadata?.avatar_url}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.user_metadata?.full_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">{user?.email}</DropdownMenuLabel>
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