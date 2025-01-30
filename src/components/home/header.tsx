import { UserButton } from "@/components/user-button"
import { LogoHorizontal } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

export async function Header() {
  return (
    <header className="w-full flex justify-center items-center h-[62px] border-y border-color">
      <div className="w-full max-w-[800px] border-x border-color md:border-none px-6 justify-between mx-auto h-full flex items-center">
        <LogoHorizontal className="w-[100px] h-auto fill-black dark:fill-white" />

        <div className="flex gap-[10px]">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}