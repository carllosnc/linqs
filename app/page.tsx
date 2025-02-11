import { HomeHeader } from "@/components/home/home-header";
import { Illustration } from "@/components/illustration";
import { LogoSymbol } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main>
      <HomeHeader />

      <div className="w-full m-auto max-w-[900px] border-x border-color flex flex-col gap-[50px] py-[30px]">
        <div className="w-full px-6 flex flex-col gap-[20px] items-center justify-center">

          <LogoSymbol className="w-[120px] h-auto fill-black dark:fill-zinc-700" />

          <h1 className="text-[30px] md:text-[25px] text-zinc-400 dark:text-zinc-600 font-bold text-center">
            The better place to <span className="text-zinc-900 dark:text-zinc-300">organize</span> and <span className="text-zinc-900 dark:text-zinc-300">share</span> links
          </h1>

          <p className="text-center text-zinc-500 w-full text-lg md:text-md max-w-[500px]">
            Linqs is a sleek, intuitive platform designed to help you effortlessly organize, manage, and share your favorite links.
          </p>

          <Button className="rounded-full"> Get Started </Button>
        </div>

        <Illustration className="w-full h-auto fill-zinc-200 dark:fill-zinc-800" />
      </div>
    </main>
  );
}
