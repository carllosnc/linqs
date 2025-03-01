"use client"

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { newPageSchema } from "@/schemas/new-page-schema";
import { Tables } from "@/database.types";
import { useState } from "react";
import { File, User } from "lucide-react";
import Link from "next/link";
import { usePageCrud } from "@/hooks/use-page-crud";

type Props = {
  userId: string
  pages: Tables<'pages'>[]
}

export function DashboardNewPage({ pages, userId }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = usePageCrud().createPage;
  const globalPages = usePageCrud().globalPages;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newPageSchema),
  });

  const onSubmit = (data: any) => {
    mutate(data)

    setOpen(false)
    reset()
  };

  return (
    <div className="card-block flex items-center justify-between">

      <span className="text-color"> {globalPages.length} Pages </span>

      <div className="flex gap-[10px] sm:flex-col">
        <Link prefetch={false} href={`/profile/${userId}`} target="_blank">
          <Button variant="outline">
            <User className="w-4 h-4 mr-2" />
            Public profile
          </Button>
        </Link>

        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button>
              <File className="w-4 h-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>

          <DialogContent className="dialog-content">
            <DialogHeader className="flex flex-col">
              <DialogTitle>Create new page</DialogTitle>
              <DialogDescription>
                A page is a collection of links.
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-[12px]">
                <Label className="inline-flex gap-[6px] items-center">
                  <span>Title</span>
                  {
                    errors.title &&
                    <span className="text-red-500 dark:text-red-400">
                      {errors.title.message as string}
                    </span>
                  }
                </Label>
                <Input placeholder="Enter page title" {...register('title')} />
              </div>

              <div className="flex flex-col gap-[12px]">
                <Label className="inline-flex gap-[6px] items-center">
                  <span>Description</span>
                  {
                    errors.description &&
                    <span className="text-red-500 dark:text-red-400">
                      {errors.description.message as string}
                    </span>
                  }
                </Label>
                <Input placeholder="Enter page description" {...register('description')} />
              </div>

              <div>
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
