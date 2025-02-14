import { Tables } from "@/database.types"
import { atom } from "jotai"

export const pagesAtom = atom<Tables<'pages'>[]>([])
