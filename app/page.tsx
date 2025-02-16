"use client"

import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-footer"
import { Illustration } from "@/components/illustration";
import { LogoSymbol } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-bg">
      <HomeHeader />

      <div className="w-full m-auto max-w-[900px] border-x border-color flex flex-col gap-[50px] pt-[30px] lg:border-none">
        <div className="w-full px-6 flex flex-col gap-[20px] items-center justify-center">

          <LogoSymbol className="w-[80px] h-auto fill-black dark:fill-neutral-700" />

          <h1 className="text-[30px] w-full max-w-[500px] md:text-[25px] title-color font-bold text-center">
            The better place to organize and share favorite links
          </h1>

          <p className="text-center text-neutral-500 w-full text-[20px] md:text-md max-w-[600px]">
            Linqs is a sleek, intuitive platform designed to help you effortlessly organize, manage, and share your favorite links.
          </p>

          <Link prefetch={false} href="/sign-in">
            <Button> Get Started </Button>
          </Link>
        </div>

        <hr className="border-color" />

        <div className="p-6 flex flex-col w-full items-center justify-center gap-[20px]">
          <p className="text-center text-[20px] max-w-[600px] text-neutral-500">
            This is a personal project that I'm developing for free. The main goal is to practice my frontend skills and solve some problems that I have in my daily life with my bookmarks.
          </p>
        </div>

        <hr className="border-color" />

          <Illustration className="w-full h-auto fill-neutral-300 dark:fill-neutral-800" />
      </div>

      <HomeFooter />
    </main>
  );
}
