import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@emotion/styled/macro'

import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
import { ReactComponent as CheckIcon } from '../assets/check-circle.svg'
import AppIconImg from '../assets/icon.png'

export const Controls = () => {
  const { resizeFiles, setResizeWidth } = useActions(actions => ({
    resizeFiles: actions.resizeFiles,
    setResizeWidth: actions.setResizeWidth,
  }))

  const { stage, resizeWidth } = useStore(state => ({
    stage: state.stage,
    resizeWidth: state.resizeWidth,
  }))

  const isShowingControls = ['INIT', 'DRAGGING_OVER'].includes(stage)

  return (
    <ControlsContainer>
      <AppIcon src={AppIconImg} />
      <Heading>
        Resizing to: <strong>{resizeWidth}px</strong>
      </Heading>
      {isShowingControls ? (
        <SizeButtons>
          <Button onClick={() => setResizeWidth(2000)}>
            <ImageIcon />
            Large
          </Button>
          <SecondaryButton onClick={() => setResizeWidth(500)}>
            <ImageIcon />
            Small
          </SecondaryButton>
        </SizeButtons>
      ) : (
        <ConfirmButton onClick={resizeFiles}>
          <CheckIcon />
          Resize
        </ConfirmButton>
      )}
      <Disclaimer>
        If an uploaded image is already smaller than the above size, it will be
        processed as is.
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
  margin-bottom: 3.5rem;

  strong {
    color: #3ab2bd;
  }
`

const Disclaimer = styled.p`
  line-height: 1.75;
  max-width: 40ch;
  margin: 0 auto;
  color: #525f7f;
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
  background: linear-gradient(180deg, #869aff, #5468ff);
  padding: 1.5rem 3rem;
  color: #fff;
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

  svg {
    width: 24px;
    height: 24px;
    color: currentColor;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
`

const SecondaryButton = styled(Button)`
  background: linear-gradient(180deg, #fff, #f5f5fa);
  color: #3a416f;
  margin: 0;
`

const ConfirmButton = styled(Button)`
  background: linear-gradient(180deg, #68d391, #38a169);
  margin: 0 auto 3rem;
  width: min-content;
`
