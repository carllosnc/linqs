"use client"

import { Tables } from "@/types/database.types"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type props = {
  link: Tables<'links'>
}

export function DashboardLinkCard({ link }: props) {
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
        console.log("here!")

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
  }

  useEffect(() => {
    setTimeout(() => {
      checkRatio();
    }, 500)
  }, [imageRef]);

  return (
    <article className="transition-all flex items-center md:flex-col border-b border-color gap-[20px] py-[15px] px-[20px]">
      <a
        className="w-full"
        href={link.url!}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-col gap-[10px] w-full max-w-[600px]">
          <span className="link-color text-[14px] truncate"> { link.url! } </span>

          <div className="flex items-center gap-[15px]">
            <img src={getFavicon(link.url!)} alt="favicon" className="w-[20px] h-[20px]" />
            <span className="title-color"> { link.title! } </span>
          </div>
        </div>
      </a>

      <Button disabled={loading} onClick={deleteLink} variant="outline" size="icon">
        {
          loading
          ? <Spinner size="sm" color="danger" />
          : <Trash className="text-red-500" size={15} />
        }
      </Button>
    </article>
  )
}

