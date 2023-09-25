"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"

type ShowcaseContextState = [number, Dispatch<SetStateAction<number>>]

const ShowcaseContext = createContext<ShowcaseContextState | undefined>(
  undefined
)

interface ShowcaseProviderProps {
  children: React.ReactNode
}

const ShowcaseProvider = ({ children }: ShowcaseProviderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const value = useMemo(
    () => [currentIndex, setCurrentIndex],
    [currentIndex, setCurrentIndex]
  ) as ShowcaseContextState

  return (
    <ShowcaseContext.Provider value={value}>
      {children}
    </ShowcaseContext.Provider>
  )
}

function useShowcase() {
  const context = useContext(ShowcaseContext)
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }
  return context
}

export { ShowcaseProvider, useShowcase }
