"use client"

import { Tables } from "@/database.types"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner"
import Link from "next/link";

type props = {
  link: Tables<'links'>
}

export function SinglePageLinkCard({ link }: props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false);

  function getFavicon(url: string) {
    const host = new URL(url).hostname;

    return `https://icons.duckduckgo.com/ip3/${host}.ico`;
  }

  function checkRatio(){
    if (imageRef.current) {
      const ratio = Number(
        ((imageRef.current!.naturalWidth || 0) / (imageRef.current!.naturalHeight || 1)).toFixed(1)
      );

      if (ratio >= 1.5 && ratio <= 1.9) {
        imageRef.current!.classList.remove("hidden");
      }
    }
  }

  async function deleteLink() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("links").delete().eq("id", link.id).eq("user_id", user?.id)
    setLoading(false);

    toast(
      `Link: ${link.title} was deleted`,
    )
  }

  useEffect(() => {
    setTimeout(() => {
      checkRatio();
    }, 500)
  }, [imageRef]);

  return (
    <article className="card-block card-linkable md:flex-col md:gap-[20px] md:items-start overflow-hidden flex items-center">
      <Link
        prefetch={false}
        className="w-full"
        href={link.url!}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-col gap-[10px]">
          <span className="link-color text-[14px] truncate max-w-[600px]">
            { link.url! }
          </span>

          <div className="flex items-center gap-[20px]">
            <div className="p-[3px] dark:bg-neutral-700 rounded-[3px]">
              <img src={getFavicon(link.url!)} alt="favicon" className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]" />
            </div>
            <span className="title-color max-w-[500px]"> { link.title! } </span>
          </div>
        </div>
      </Link>

      <Button disabled={loading} onClick={deleteLink} variant="outline" size="icon">
        {
          loading
          ? <Spinner size="sm" color="danger" />
          : <Trash className="text-color" size={15} />
        }
      </Button>
    </article>
  )
}

