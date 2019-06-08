import React from 'react'
import { ThemeProvider as ThemeProviderBase } from '@xstyled/styled-components'

import { getCurrentTheme } from '../util/getCurrentTheme'

const theme = getCurrentTheme()

export const ThemeProvider = ({ children }) => (
  <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
)
