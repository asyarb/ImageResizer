import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'

import { GlobalStyle } from './GlobalStyle'
import { ImageResizer } from './ImageResizer/ImageResizer'
import { theme } from '../theme'

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppContainer>
      <ImageResizer />
    </AppContainer>
  </ThemeProvider>
)

const AppContainer = styled.main`
  min-height: 100vh;
`
