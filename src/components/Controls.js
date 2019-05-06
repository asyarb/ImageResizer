import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@emotion/styled/macro'

import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
import { ReactComponent as CheckIcon } from '../assets/check-circle.svg'
import { ReactComponent as ArrowIcon } from '../assets/arrow-right-circle.svg'
import AppIconImg from '../assets/icon.png'

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

  const isShowingControls = [
    'INIT',
    'DRAGGING_OVER',
    'UPLOADED_FILES',
  ].includes(stage)
  const isShowingConfirm = ['UPLOADED_FILES', 'RESIZING'].includes(stage)

  return (
    <ControlsContainer>
      <AppIcon src={AppIconImg} />
      <Heading>
        Resizing to: <strong>{resizeWidth}px</strong>
      </Heading>
      {isShowingControls && (
        <SizeButtons>
          <Button
            onClick={() => setResizeWidth(2000)}
            isActive={resizeWidth === 2000}
          >
            <ImageIcon />
            Large
          </Button>
          <Button
            onClick={() => setResizeWidth(500)}
            isActive={resizeWidth === 500}
          >
            <ImageIcon />
            Small
          </Button>
        </SizeButtons>
      )}

      {isShowingConfirm && (
        <ConfirmButton onClick={resizeFiles}>
          <CheckIcon />
          Resize
        </ConfirmButton>
      )}

      {stage === 'FINISHED' && (
        <ResizeMoreButton onClick={resetFiles}>
          <ArrowIcon /> Resize More
        </ResizeMoreButton>
      )}
      <Disclaimer>
        If an uploaded image is already smaller than the selected size, it will
        be processed as is.
      </Disclaimer>
    </ControlsContainer>
  )
}

const AppIcon = styled.img`
  width: 175px;
  margin: 0 auto;
`

const ControlsContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  padding: 3rem;
  text-align: center;
`

const Heading = styled.h2`
  font-size: 3.5rem;
  font-weight: 500;
  margin-bottom: 2rem;

  strong {
    color: #3ab2bd;
  }
`

const Disclaimer = styled.p`
  line-height: 1.75;
  max-width: 40ch;
  margin: 0 auto;
  color: #a0aec0;
  font-size: 1.7rem;
`

const SizeButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  background: ${p =>
    p.isActive
      ? 'linear-gradient(180deg, #869aff, #5468ff)'
      : 'linear-gradient(180deg, #fff, #f5f5fa)'};
  padding: 0.75rem 2rem;
  color: ${p => (p.isActive ? '#fff' : '#3a416f')};
  font-weight: 600;
  box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
  cursor: pointer;
  border-radius: 50px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  margin-right: 3rem;
  outline: none;

  &:hover,
  &:focus {
    box-shadow: 0 8px 22px 0 rgba(37, 44, 97, 0.15),
      0 4px 6px 0 rgba(93, 100, 148, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:last-of-type {
    margin: 0;
  }

  svg {
    width: 24px;
    height: 24px;
    color: currentColor;
    margin-right: 1rem;
    flex-shrink: 0;
  }
`

const ConfirmButton = styled(Button)`
  background: linear-gradient(180deg, #68d391, #38a169);
  width: min-content;
  color: #fff;
  padding: 1.5rem 3rem;

  &:last-of-type {
    margin: 0 auto 3rem;
  }
`

const ResizeMoreButton = styled(ConfirmButton)`
  background: linear-gradient(180deg, #7f9cf5, #5a67d8);
  width: auto;
`
