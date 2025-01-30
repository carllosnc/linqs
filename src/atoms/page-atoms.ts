import { Page } from "@/lib/db-types"
import { atom } from "jotai"

export const atomPagesLoading = atom<boolean>(false)
export const atomPages = atom<Page[]>([])
