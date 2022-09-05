import { useEffect, useRef } from 'react'

/**
 * Effect run once, for impression track once
 */
export const useOnce = (
  deps: any[],
  effect: () => any,
  condition: () => boolean,
) => {
  const onceRef = useRef(false)
  const effectRef = useRef(effect)
  effectRef.current = effect
  const conditionRef = useRef(condition)
  conditionRef.current = condition

  useEffect(() => {
    if (onceRef.current) {
      return
    }
    if (conditionRef.current()) {
      onceRef.current = true
      effectRef.current()
    }
  }, deps)
}
