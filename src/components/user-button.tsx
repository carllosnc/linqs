import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
}
from "@/components/ui/dropdown-menu"

import { auth, signOut } from "@/auth"

function firstLetter(str: string) {
  return str.charAt(0).toUpperCase()
}

export async function UserButton() {
  const session = await auth()
  const image = session?.user?.image
  const name = session?.user?.name

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage src={image as string} />
            <AvatarFallback>{ firstLetter(name!) }</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel> { name } </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={ async () => {
              "use server"
                await signOut({
                  redirectTo: "/auth",
                })
              }}>
                <button className="text-red-500 dark:text-red-400" type="submit">
                  Log out
                </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button variant="outline">
      <a href="/auth">Log in</a>
    </Button>
  )
}