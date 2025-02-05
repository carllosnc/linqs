"use client"

import { Tables } from "@/types/database.types"
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef } from "react";

type props = {
  link: Tables<'links'>
}

export function DashboardLinkCard({ link }: props) {
  const imageRef = useRef<HTMLImageElement>(null);

  function getFavicon(url: string) {
    const host = new URL(url).hostname;

    return `https://icons.duckduckgo.com/ip3/${host}.ico`;
  }

  function checkRatio(){
    if (imageRef.current) {
      const ratio = Number(
        ((imageRef.current!.naturalWidth || 0) / (imageRef.current!.naturalHeight || 1)).toFixed(1)
      );

      console.log(ratio)

      if (ratio >= 1.5 && ratio <= 1.9) {
        console.log("here!")

        imageRef.current!.classList.remove("hidden");
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      console.log('here!')

      checkRatio();
    }, 1000)
  }, [imageRef]);

  return (
    <article className="transition-all flex md:flex-col border-b border-color gap-[20px] p-[20px]">
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
            <span className="title-color font-semibold"> { link.title! } </span>
          </div>

          <span className="text-color"> { link.description! } </span>

          <img
            ref={imageRef}
            src={link.image!}
            alt="favicon"
            className="p-[5px] border hidden border-color w-[full] max-w-[400px] h-auto" />
        </div>
      </a>

      <Button variant="outline" size="icon">
        <EllipsisVertical />
      </Button>
    </article>
  )
}

