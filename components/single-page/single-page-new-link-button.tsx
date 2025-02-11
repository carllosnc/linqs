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
import { Tables, TablesInsert } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { Link as LinkIcon} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function SinglePageNewLinkButton({ pageId, page }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <LinkIcon className="w-4 h-4 mr-2" />
          New link
        </Button>
      </DialogTrigger>

      <DialogContent className="border gap-[30px] border-white dark:border-neutral-800">
        <DialogHeader className="text-left">
          <DialogTitle className="font-medium"> Create new link </DialogTitle>
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
  )
}