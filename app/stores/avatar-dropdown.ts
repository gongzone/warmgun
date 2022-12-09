import create from 'zustand'

interface AvatarDropdownState {
  isOpen: boolean
  toggleAvatarDropdown: () => void
}

const useAvatarDropdownStore = create<AvatarDropdownState>((set) => ({
  isOpen: false,
  toggleAvatarDropdown: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useAvatarDropdownStore
