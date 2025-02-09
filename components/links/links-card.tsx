"use client"

import { Tables } from "@/types/database.types"
import { useEffect, useRef } from "react";

type props = {
  tiny: boolean,
  link: Tables<'links'>
}

export function LinksLinkCard({ link, tiny }: props) {
  const imageRef = useRef<HTMLImageElement>(null);

  function getFavicon(url: string) {
    const host = new URL(url).hostname;

    return `https://icons.duckduckgo.com/ip3/${host}.ico`;
  }

  function checkRatio(){
    if (imageRef.current) {
      const imageWidth = imageRef.current!.naturalWidth
      const imageHeight = imageRef.current!.naturalHeight

      if (imageWidth !== 0){
        imageRef.current!.classList.remove("hidden");

        switch (true) {
          case imageWidth <= 60:
            imageRef.current!.classList.add("display-none");
          case imageWidth <= 100:
            imageRef.current!.classList.add("width-100");
            break;
          case imageWidth <= 200:
            imageRef.current!.classList.add("width-200");
            break;
          case imageWidth <= 300:
            imageRef.current!.classList.add("width-300");
            break;
        }
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkRatio();
    }, 500);
  }, [imageRef, tiny]);

  function getHost(url: string){
    const host = new URL(url).hostname;

    return host
  }

  return (
    <a
      className="p-5 w-full rounded-lg sm:rounded-none transition-all bg-white dark:bg-neutral-900 border border-color sm:border-l-0 sm:border-r-0 flex-col shadow-2xl shadow-neutral-200 dark:shadow-none overflow-hidden flex gap-[10px] hover:border-blue-500"
      href={link.url!}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex gap-[10px] items-center">
        <img src={getFavicon(link.url!)} alt="favicon" className="w-[15px] h-[15px] min-w-[20px] min-h-[20px]" />
        <span className="link-color">{getHost(link.url!)}</span>
      </div>

      <span className="title-color"> { link.title! } </span>

      {!tiny &&
        <img
          ref={imageRef}
          alt={link.title!}
          src={link.image!}
          className="w-full bg-white hidden border border-color"
        />
      }

      {!tiny &&
        <span className="text-color">
          {link.description}
        </span>
      }
    </a>
  )
}

