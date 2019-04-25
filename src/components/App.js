import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled/macro'

import { GlobalStyle } from './GlobalStyle'
import { theme } from '../theme'

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppContainer>This is my moment</AppContainer>
  </ThemeProvider>
)

const AppContainer = styled.main`
  min-height: 100vh;
`
