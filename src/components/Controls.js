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
      <SizeLabel>
        Size: <strong>{resizeWidth}px</strong>
      </SizeLabel>
      <ButtonContainer>
        {isShowingControls && (
          <>
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
          </>
        )}

        {isShowingConfirm && (
          <>
            <Button type="secondary" onClick={resetFiles}>
              Cancel
            </Button>
            <ResizeButton type="confirm" onClick={resizeFiles}>
              Resize
            </ResizeButton>
          </>
        )}

        {stage === 'FINISHED' && (
          <Button type="primary" onClick={resetFiles}>
            Resize More
          </Button>
        )}
      </ButtonContainer>
    </ControlsContainer>
  )
}

const ControlsContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 2rem;
  text-align: center;
  background-color: controlsBarBg;
  border-top: windowBorder;
`

const SizeLabel = styled.h2`
  font-size: tiny;
  color: secondaryTextColor;
  font-weight: 500;

  strong {
    font-size: normal;
    color: primaryTextColor;
  }
`

const LargeToggle = styled(Button)`
  margin-right: 1rem;
`

const ResizeButton = styled(Button)`
  margin-left: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
