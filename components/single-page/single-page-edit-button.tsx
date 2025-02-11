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
import { Tables, TablesInsert, TablesUpdate } from "@/database.types";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/utils/supabase/client";

type Props = {
  page: Tables<'pages'>
  onChage: (title: String, descriptions: String) => void
}

export function SinglePageEditButton({ page, onChage }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>(page.title as string)
  const [descriptions, setDescriptions] = useState<string | null>(page.descriptions)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newPageSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const pageData: TablesUpdate<"pages"> = {
      user_id: user?.id,
      descriptions: data.description,
      title: data.title,
    };

    await supabase.from("pages").update(pageData).eq("id", page.id)

    setLoading(false)
    setOpen(false)
    reset()
    setTitle(data.title)
    setDescriptions(data.description)
    onChage(data.title, data.description)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-4 h-4 text-color" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border gap-[30px] border-white dark:border-neutral-800">
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
              defaultValue={descriptions!}
              placeholder="Enter page description"
              {...register('description')}
            />
          </div>

          <div>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
