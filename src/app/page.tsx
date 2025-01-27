import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"

export default async function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center">
      <Header />
      <div>
        <h1 className="text-[100px]">☩</h1>
      </div>
      <Footer />
    </div>
  )
}
