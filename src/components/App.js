import React from 'react'
import styled from '@emotion/styled'

import { GlobalStyle } from './GlobalStyle'

import { FileDropZone } from './FileDropZone'
import { Controls } from './Controls'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <FileDropZone />
        <Controls />
      </AppContainer>
    </>
  )
}

const AppContainer = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
`
