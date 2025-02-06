import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export default async function PublicPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params

  const singlePageRequest = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  const singlePageData = singlePageRequest.data as Tables<'pages'>

  const linksRequest = await supabase
    .from("links")
    .select("*")
    .eq("page_id", id)
    .order("created_at", { ascending: false });

  const linksData = linksRequest.data as Tables<'links'>[]

  return (
    <main className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen flex flex-col justify-between">
      <h1 className="text-2xl font-medium">
        {singlePageData.title}
        {/* check if page is public or not */}
        {singlePageData.isPublic}
      </h1>
    </main>
  );
}