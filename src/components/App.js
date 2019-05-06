import React from 'react'
import styled from '@emotion/styled'

import { GlobalStyle } from './GlobalStyle'

import { FileInput } from './FileInput'
import { Controls } from './Controls'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <FileInput />
        <Controls />
      </AppContainer>
    </>
  )
}

const AppContainer = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 3fr 450px;
`
