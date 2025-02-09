"use client"

import { Tables } from "@/database.types"
import { LinksLinkCard } from "@/components/links/links-card"
import { AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LinksSheet } from "@/components/links/links-sheet";

type props = {
  userId: string
  email: string
  links: Tables<'links'>[]
}

export function LinksLinkList({ links, userId, email }: props) {
  const [tiny, setTiny] = useState<boolean>(false);

  if (links.length === 0) {
    return (
      <div className="px-4 w-full max-w-[550px] m-auto flex flex-col gap-[20px] justify-center items-center">
        <LinksSheet email={email} userId={userId as string} />

        <div className="bg-red text-center h-[150px] w-full bg-white dark:bg-neutral-900 border border-color rounded-lg shadow-2xl shadow-neutral-200 dark:shadow-none flex flex-col items-center justify-center gap-[10px] p-[20px]">
          <AlertCircle className="text-color" />
          <span className="text-color">
            Page without links
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center">
      <div className="flex md:px-4 gap-[10px] justify-between items-center w-full max-w-[550px]">

        <LinksSheet email={email} userId={userId as string} />

        <div className="flex items-center gap-[10px]">
          <span className="text-color"> Tiny card </span>
          <Switch
            checked={tiny}
            onCheckedChange={setTiny}
          />
        </div>

        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-[550px] flex flex-col gap-[20px]">
        {
          links.map((link, index) => {
            return (
              <LinksLinkCard tiny={tiny} key={index} link={link} />
            )
          })
        }
      </div>
    </div>
  )
}