import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuChevronsLeft } from "react-icons/lu"

export default async function Page(){
  return (
    <section className="w-full border-b border-color px-6 py-4 flex justify-between items-center">
      <Link href="/dashboard">
        <Button variant="outline">
          <LuChevronsLeft />
          <span>Back</span>
        </Button>
      </Link>
      <Button>New link</Button>
    </section>
  )
}