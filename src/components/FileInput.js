import React from 'react'
import { useStore } from 'easy-peasy'
import styled from '@emotion/styled/macro'

import { FileList } from './FileList'
import { DropZone } from './DropZone'
import { ReactComponent as ArrowIconBG } from '../assets/arrow-down-circle.svg'

export const FileInput = props => {
  const stage = useStore(state => state.stage)

  const isShowingDropZone = ['INIT', 'DRAGGING_OVER'].includes(stage)

  return (
    <Container hasPadding={isShowingDropZone} {...props}>
      <ArrowIconBG />

      {isShowingDropZone && <DropZone />}
      {stage === 'UPLOADED_FILES' && <FileList />}
      {stage === 'RESIZING' && <div>Loading...</div>}
      {stage === 'FINISHED' && <div>Finished!</div>}
    </Container>
  )
}

const Container = styled.div`
  background: #f7fafc;
  position: relative;
  padding: ${p => (p.hasPadding ? '2rem' : null)};

  svg {
    position: absolute;
    width: 60%;
    height: 60%;
    opacity: 0.15;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #bee3f8;
  }
`
