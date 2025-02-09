"use client"

import { useGetUser } from "@/hooks/use-get-users"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function UserButton() {
  const router = useRouter()
  const { user } = useGetUser()

  console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage className="w-7 h-7 rounded-full" src={user?.user_metadata?.avatar_url} />
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