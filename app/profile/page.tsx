export default async function ProfilePage() {
  return (
    <main className="w-full bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col gap-[30px] items-center">
      <section className="flex flex-col gap-[20px] justify-between items-center w-full max-w-[400px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[20px] title-color font-bold">
            Profile
          </h1>
          <p className="text-color">
            Your profile is private and only visible to you.
          </p>
        </div>
      </section>
    </main>
  )
}