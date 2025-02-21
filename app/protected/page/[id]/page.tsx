import SinglePageContent from "@/components/single-page/single-page-content";
import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient();
  const { id } = await params

  const singlePageRequest = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  const data = singlePageRequest.data as Tables<'pages'>

  return {
    title: data.title,
  }
}

export default async function SinglePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  return <SinglePageContent id={id} />
}
