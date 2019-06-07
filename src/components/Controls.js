import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@xstyled/styled-components'

import { Button } from '../components/Button'

export const Controls = () => {
  const { resizeFiles, setResizeWidth, resetFiles } = useActions(actions => ({
    resizeFiles: actions.resizeFiles,
    setResizeWidth: actions.setResizeWidth,
    resetFiles: actions.resetFiles,
  }))

  const { stage, resizeWidth } = useStore(state => ({
    stage: state.stage,
    resizeWidth: state.resizeWidth,
  }))

  const isShowingControls = ['INIT', 'DRAGGING_OVER'].includes(stage)
  const isShowingConfirm = ['UPLOADED_FILES', 'RESIZING'].includes(stage)

  return (
    <ControlsContainer>
      <Heading>
        Size: <strong>{resizeWidth}px</strong>
      </Heading>
      {isShowingControls && (
        <SizeButtons>
          <LargeToggle
            onClick={() => setResizeWidth(2000)}
            type={resizeWidth === 2000 ? 'primary' : 'secondary'}
          >
            Large
          </LargeToggle>
          <Button
            onClick={() => setResizeWidth(500)}
            type={resizeWidth === 500 ? 'primary' : 'secondary'}
          >
            Small
          </Button>
        </SizeButtons>
      )}

      {isShowingConfirm && (
        <Button type="confirm" onClick={resizeFiles}>
          Resize
        </Button>
      )}

      {stage === 'FINISHED' && (
        <ResizeMoreButton onClick={resetFiles}>Resize More</ResizeMoreButton>
      )}
    </ControlsContainer>
  )
}

const ControlsContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 2rem;
  text-align: center;
  background-color: window.90;
`

const Heading = styled.h2`
  font-size: tiny;
  color: #525f7f;

  strong {
    font-size: normal;
    color: #32325d;
  }
`

const LargeToggle = styled(Button)`
  margin-right: 1rem;
`

const SizeButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResizeMoreButton = styled(Button)`
  background: linear-gradient(180deg, #7f9cf5, #5a67d8);
  width: auto;
`
