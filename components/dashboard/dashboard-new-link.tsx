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
import { newLinkSchema } from "@/schemas/new-link-schema";
import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert } from "@/types/database.types";
import { useState } from "react";
import { ChevronLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Switch } from "../ui/switch";

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function DashboardNewLink({ pageId, page }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newLinkSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Hello world!")

    setLoading(true)
    const supabase = createClient();

    const metadataRequest = await fetch(`https://api.dub.co/metatags?url=${data.url}`)
    const metadataData = await metadataRequest.json() as {
      title: string
      description: string
      image: string
    }

    const linkData: TablesInsert<"links"> = {
      page_id: pageId,
      url: data.url,
      title: metadataData.title,
      description: metadataData.description,
      image: metadataData.image,
    };

    await supabase.from("links").insert(linkData)

    setLoading(false)
    setOpen(false)
    reset()
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-color">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white hover:text-white hover:bg-blue-700" size="sm">
            <LinkIcon className="w-4 h-4 mr-2" />
            New link
          </Button>
        </DialogTrigger>

        <DialogContent className="border gap-[30px] border-white dark:border-neutral-800">
          <DialogHeader className="text-left">
            <DialogTitle>Create new link</DialogTitle>
          </DialogHeader>

          <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[12px]">
              <Label className="inline-flex gap-[6px] items-center">
                <span>URL</span>
                {
                  errors.url &&
                  <span className="text-red-500 dark:text-red-400">
                    {errors.url.message as string}
                  </span>
                }
              </Label>
              <Input placeholder="Enter link URL" {...register('url')} />
            </div>

            <div>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-[10px]">
        <span className="text-color"> This page is public? </span>
        <Switch />
      </div>

    </div>
  )
}
