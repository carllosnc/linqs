"use client"

import SinglePageContent from "@/components/single-page/single-page-content";
import { useParams } from "next/navigation";

export default function SinglePage() {
  const params = useParams<{ id: string }>()

  return <SinglePageContent id={params.id} />
}
