import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage({params}: {params: {id: string}}) {
   const supabase = await createClient();
   const { id } = await params

  const profileRequest = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  const profileData = profileRequest.data as Tables<'profiles'>

  const pagesRequest = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  const pagesData = pagesRequest.data as Tables<'pages'>[]

  return (
    <main className="w-full bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col gap-[30px] items-center">
      <p> Data here! </p>
    </main>
  )
}