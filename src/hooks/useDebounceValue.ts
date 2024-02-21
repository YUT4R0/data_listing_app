import { useEffect, useState } from "react"

export function useDebounceValue<T = unknown>(value: T, delay: number) {
  const [debouncedValue, setdebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setdebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}