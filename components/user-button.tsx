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

export function UserButton() {
  const router = useRouter()
  const { user } = useGetUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-[40px] h-[40px] rounded-md border border-color flex items-center justify-center">
          <User className="w-5 h-5 text-color" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
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