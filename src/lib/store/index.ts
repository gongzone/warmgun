import { create } from "zustand"

import { createWriteSlice, WriteSlice } from "./write"

export const useStore = create<WriteSlice>((...a) => ({
  ...createWriteSlice(...a),
}))
