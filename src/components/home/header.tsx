import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
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
  DropdownMenuTrigger
}
from "@/components/ui/dropdown-menu"
import { auth, signOut } from "@/auth"

export async function Header() {
  const session = await auth()
  const image = session?.user?.image
  const name = session?.user?.name

  function firstLetter(str: string) {
    return str.charAt(0).toUpperCase()
  }

  function loginButton() {
    if (session?.user) {
      return (
        <div className="flex items-center gap-[20px]">
          <Button variant="outline">
            <a href="/dashboard">Dashboard</a>
          </Button>

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
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 w">
                <form action={ async () => {
                  "use server"
                    await signOut()
                  }}>
                    <button className="text-red-600" type="submit"> Log out </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }

    return (
      <Button variant="outline">
        <a href="/auth">Log in</a>
      </Button>
    )
  }

  return (
    <header className="w-full flex justify-center items-center h-[62px] px-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="w-full max-w-[1200px] justify-between mx-auto h-full flex items-center">
        <h1 className="text-zinc-800 dark:text-zinc-500 font-bold tracking-widest">ONE STACK</h1>

        <div className="flex gap-[10px]">
          <ModeToggle />
          {loginButton()}
        </div>
      </div>
    </header>
  )
}