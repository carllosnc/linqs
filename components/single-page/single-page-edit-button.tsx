"use client"

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
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
import { Edit } from "lucide-react";
import { usePageCrud } from "@/hooks/use-page-crud";

type Props = {
  page: Tables<'pages'>
  onChage: (title: String, description: String) => void
}

export function SinglePageEditButton({ page, onChage }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>(page.title as string)
  const [description, setDescription] = useState<string | null>(page.description)
  const { mutate, isPending } = usePageCrud().updatePage(page.id);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newPageSchema),
  });

  const onSubmit = async (data: any) => {
    mutate(data)

    setOpen(false)
    reset()
    setTitle(data.title)
    setDescription(data.description)
    onChage(data.title, data.description)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-4 h-4 text-color" />
        </Button>
      </DialogTrigger>

      <DialogContent className="dialog-content">
        <DialogHeader className="flex flex-col">
          <DialogTitle className="font-medium"> Edit page: {page.title} </DialogTitle>
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
            <Input
              defaultValue={title}
              placeholder="Enter page title" {...register('title')}
            />
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

            <Input
              defaultValue={description!}
              placeholder="Enter page description"
              {...register('description')}
            />
          </div>

          <div>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
