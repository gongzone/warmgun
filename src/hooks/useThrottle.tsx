import { useRef } from "react"

const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const lastCall = useRef(0)

  return function (...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall.current < delay) {
      return
    }

    lastCall.current = now
    return callback(...args)
  }
}

export { useThrottle }
