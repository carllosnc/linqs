"use client"

import { LogoHorizontal, LogoSymbol } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserButton } from "@/components/user-button";

export function DashboardHeader() {
  return (
    <header className="border-b border-color">
      <div className="flex gap-[10px] lg:border-none justify-between items-center p-4 w-full max-w-[900px] border-x border-color m-auto">
        <ThemeSwitcher />

        <LogoHorizontal className="fill-black max-w-[100px] h-auto dark:fill-white" />

        <UserButton />
      </div>
    </header>
  )
}