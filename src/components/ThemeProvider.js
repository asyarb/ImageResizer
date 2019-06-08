import React from 'react'
import { ThemeProvider as ThemeProviderBase } from '@xstyled/styled-components'

import { useCurrentTheme } from '../hooks/useCurrentTheme'

export const ThemeProvider = ({ children }) => {
  const theme = useCurrentTheme()

  return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
}
