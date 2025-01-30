"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LuAppWindow } from "react-icons/lu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createPage } from "@/repository/page-service"
import { useSession } from "next-auth/react"
import { getCurrentUser } from "@/repository/user-service"
import { useAtom } from "jotai"
import { atomPages } from "@/atoms/page-atoms"
import { useRouter } from "next/navigation"

export function CreatePageButton() {
  const [pageName, setPageName] = useState<string>("")
  const [validate, setValidate] = useState<boolean>(false)
  const { data: session } = useSession()
  const [pages] = useAtom(atomPages)
  const router = useRouter()

  function validation(name: string, action: () => void){
    if (name.trim().length === 0){
      setValidate(true)
    }else{
      setValidate(false)
      action()
    }
  }

  function clearValidation(isOpen: boolean){
    if (!isOpen) {
      setValidate(false)
    }
  }

  async function createPageAction(){
    validation(pageName, async () => {
      const user = await getCurrentUser(session!)

      const page = await createPage({
        slug: pageName.toLowerCase().replaceAll(" ", "-"),
        numberOfLinks: 0,
        name: pageName,
        userId: user.id,
      })

      router.push(`/dashboard/page/${page[0]}`)
    })
  }

  return (
    <section className="w-full border-b border-color px-6 py-4 flex justify-between items-center">
      <span> { pages.length } Pages created </span>

      <Dialog onOpenChange={clearValidation}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <LuAppWindow className="w-5 h-5" />
            <span>Create new page</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[400px] rounded-[10px]">
          <DialogHeader>
            <DialogTitle>New page</DialogTitle>
            <DialogDescription>
              A new page to place your links
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Page name
            </Label>
            <Input
              onChange={(e) => setPageName(e.target.value)}
              id="name"
              placeholder="Enter the name of page"
              className="col-span-3"
            />
            {
              validate &&
              <small className="text-red-500 dark:text-red-400">
                Enter a valid name
              </small>
            }
          </div>
          <DialogFooter>
            <div className="flex items-center justify-center">
              <Button
                onClick={createPageAction}
                variant="default"
                type="button">
                  Create Page
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}