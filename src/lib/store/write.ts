import { type StateCreator } from "zustand"

export type WriteSlice = {
  title: string | null
  body: unknown
  thumbnail: string | null
  tags: string[] | null
  updateTitle: (title: string) => void
  updateBody: (body: unknown) => void
  updateThumbnail: (thumbnail: string) => void
  updateTags: (tags: string[]) => void
}

export const createWriteSlice: StateCreator<WriteSlice, [], [], WriteSlice> = (
  set
) => ({
  title: null,
  body: null,
  thumbnail: null,
  tags: null,
  updateTitle: (title) => set(() => ({ title: title })),
  updateBody: (body) => set(() => ({ body: body })),
  updateThumbnail: (thumbnail) => set(() => ({ thumbnail: thumbnail })),
  updateTags: (tags) => set(() => ({ tags: tags })),
})
