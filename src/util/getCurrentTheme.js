import { macOSLightTheme } from '../themes/macOSLight'
import { macOSDarkTheme } from '../themes/macOSDark'

export const getCurrentTheme = () => {
  const osTheme = localStorage.getItem('osTheme')

  if (osTheme === 'dark') {
    return macOSDarkTheme
  }

  return macOSLightTheme
}
