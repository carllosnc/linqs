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
import { Spinner } from "@/components/ui/spinner";
import { DashboardSidebarPages } from "@/components/dashboard/dashboard-sidebar-pages"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { newLinkSchema } from "@/schemas/new-link-schema";
import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert } from "@/types/database.types";
import { useState } from "react";
import {
  ChevronLeft,
  Globe,
  Link as LinkIcon,
  Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader
} from "@/components/ui/alert-dialog";

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function DashboardPageToolbar({ pageId, page }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newLinkSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const metadataRequest = await fetch(`https://api.dub.co/metatags?url=${data.url}`)
    const metadataData = await metadataRequest.json() as {
      title: string
      description: string
      image: string
    }

    const linkData: TablesInsert<"links"> = {
      user_id: user!.id!,
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

  async function deletePage() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("pages").delete().eq("id", pageId).eq("user_id", user?.id)
    setLoading(false);

    router.push("/protected")
    toast(
      `Page ${page.title} was deleted`,
      {
        description: "All links from this page was deleted too",
      }
    )
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-color">
      <div className="flex items-center gap-[20px]">
        <Button variant="outline" size="icon">
          <Link href="/protected">
            <ChevronLeft size={20} />
          </Link>
        </Button>

        <DashboardSidebarPages />

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
      </div>

      <div className="flex gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <span className="text-color"> Public </span>
          <Switch />
        </div>

        <Link target="_blank" href={`/links/${pageId}`}>
          <Button size="icon" variant="outline" disabled={loading}>
            <Globe size={20} />
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button size="icon" variant="outline">
              { loading
                ? <Spinner size="sm" color="danger" />
                : <Trash className="text-color" size={15} />
              }
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                All links from this page will be deleted too.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex flex-row justify-end gap-[10px]">
              <AlertDialogCancel className="m-0">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction onClick={deletePage}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
