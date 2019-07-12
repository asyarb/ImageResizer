import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import styled from '@xstyled/styled-components'

import { Button } from '../components/Button'
import { LARGE_SIZE, SMALL_SIZE } from '../constants'

export const Controls = () => {
  const { resizeFiles, setResizeWidth, resetFiles } = useStoreActions(
    actions => ({
      resizeFiles: actions.resizeFiles,
      setResizeWidth: actions.setResizeWidth,
      resetFiles: actions.resetFiles,
    })
  )

  const { stage, resizeWidth } = useStoreState(state => ({
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
              onClick={() => setResizeWidth(LARGE_SIZE)}
              type={resizeWidth === LARGE_SIZE ? 'primary' : 'secondary'}
            >
              Large
            </LargeToggle>
            <Button
              onClick={() => setResizeWidth(SMALL_SIZE)}
              type={resizeWidth === SMALL_SIZE ? 'primary' : 'secondary'}
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
