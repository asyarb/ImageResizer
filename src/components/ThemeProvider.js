import React from 'react'
import { ThemeProvider as ThemeProviderBase } from '@xstyled/styled-components'

import { macOSLightTheme } from '../themes/macOSLight'

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeProviderBase theme={macOSLightTheme}>{children}</ThemeProviderBase>
  )
}
