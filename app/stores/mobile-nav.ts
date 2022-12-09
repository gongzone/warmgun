import create from 'zustand'

interface MobileNavState {
  isOpen: boolean
  toggleMobileNav: () => void
}

const useMobileNavStore = create<MobileNavState>((set) => ({
  isOpen: false,
  toggleMobileNav: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useMobileNavStore
