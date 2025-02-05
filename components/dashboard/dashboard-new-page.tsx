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
import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert } from "@/types/database.types";
import { useState } from "react";
import { NotebookText } from "lucide-react";

type Props = {
  pages: Tables<'pages'>[]
}

export function DashboardNewPage({ pages }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(pages.length);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newPageSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const pageData: TablesInsert<"pages"> = {
      user_id: user?.id,
      descriptions: data.description,
      title: data.title,
    };

    await supabase.from("pages").insert(pageData)
    setNumberOfPages(c => c + 1)

    setLoading(false)
    setOpen(false)
    reset()
  };

  return (
    <div className="flex bg-white dark:bg-neutral-900 items-center justify-between p-4 border-b border-color">
      <span className="text-color"> {numberOfPages} Pages </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <NotebookText className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </DialogTrigger>

        <DialogContent className="border gap-[30px] border-white dark:border-neutral-800">
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
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
