import create from 'zustand'

interface ProfileDropdownState {
  isOpen: boolean
  toggleProfileDropdown: () => void
}

const useProfileDropdownStore = create<ProfileDropdownState>((set) => ({
  isOpen: false,
  toggleProfileDropdown: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useProfileDropdownStore
