import { useEffect, useCallback } from 'react'

export const useAsyncEffect = (fn, deps) => {
  const asyncEffect = useCallback(fn, [fn])

  useEffect(() => {
    asyncEffect()
  }, [asyncEffect])
}
