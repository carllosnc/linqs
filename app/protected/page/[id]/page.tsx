import SinglePageContent from "@/components/single-page/single-page-content";

export default async function SinglePage(
  { params }: { params:Promise<{id: string}> }
) {
  const { id } = await params

  return <SinglePageContent id={id} />
}

