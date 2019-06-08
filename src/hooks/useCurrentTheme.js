import { useState, useEffect } from 'react'
import { macOSLightTheme } from '../themes/macOSLight'
import { macOSDarkTheme } from '../themes/macOSDark'

// Returns the appropriate theme object based on the key from localStorage
export const getCurrentTheme = () => {
  const osTheme = localStorage.getItem('osTheme')

  if (osTheme === 'dark') {
    return macOSDarkTheme
  }

  return macOSLightTheme
}

// Maintains an active listener that returns the most up-to-date theme.
export const useCurrentTheme = () => {
  const [theme, setTheme] = useState(() => getCurrentTheme())

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(getCurrentTheme())
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return theme
}
