import React from 'react'
import styled from '@xstyled/styled-components'

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

const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
`
