import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoHorizontal } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function HomeHeader() {
  return (
    <header className="border-y border-color">
      <div className="flex gap-[10px] justify-between p-4 w-full max-w-[900px] border-x border-color m-auto lg:border-none">
        <div className="flex gap-2 items-center">
          <ThemeSwitcher />
          <LogoHorizontal className="fill-black max-w-[100px] h-auto dark:fill-white" />
        </div>

        <div className="flex gap-2">
          <Link href="/sign-in" prefetch={false}>
            <Button size={"sm"} variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
