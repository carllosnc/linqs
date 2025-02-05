import { LogoHorizontal } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserButton } from "@/components/user-button";

export function DashboardHeader() {
  return (
    <header className="border-y border-color">
      <div className="flex bg-white dark:bg-neutral-900 gap-[10px] justify-between p-4 w-full max-w-[900px] border-x border-color m-auto">
        <div className="flex gap-2 items-center">
          <ThemeSwitcher />
          <LogoHorizontal className="fill-black max-w-[100px] h-auto dark:fill-white" />
        </div>

        <div>
          <UserButton />
        </div>
      </div>
    </header>
  )
}