import React from 'react'
import { useStore } from 'easy-peasy'
import styled from '@xstyled/styled-components'

import { FileList } from './FileList'
import { DropZone } from './DropZone'
import { Spinner } from './Spinner'
import { Success } from './Success'

export const FileDropZone = props => {
  const stage = useStore(state => state.stage)
  const isShowingDropZone = ['INIT', 'DRAGGING_OVER'].includes(stage)

  return (
    <Container hasPadding={isShowingDropZone} {...props}>
      {isShowingDropZone && <DropZone />}
      {stage === 'UPLOADED_FILES' && <FileList />}
      {stage === 'RESIZING' && <Spinner size="4rem" />}
      {stage === 'FINISHED' && <Success />}
    </Container>
  )
}

const Container = styled.main`
  background-color: mainWindowBg;
  padding: ${p => (p.hasPadding ? '4rem 2rem 2rem' : null)};
`
