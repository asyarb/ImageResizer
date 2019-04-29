import React, { useState } from 'react'
import styled from '@emotion/styled'

import { GlobalStyle } from './GlobalStyle'
import { ImageResizer } from './ImageResizer/ImageResizer'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'

export const App = () => {
  const [resizeWidth, setResizeWidth] = useState(2000)

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ImageResizer resizeWidth={resizeWidth} />
        <Controls>
          <Heading>
            Resizing to: <strong>{resizeWidth}px</strong>
          </Heading>
          <SizeButtons>
            <Button onClick={() => setResizeWidth(2000)}>
              <ImageIcon />
              Large Image
            </Button>
            <SecondaryButton onClick={() => setResizeWidth(500)}>
              <ImageIcon />
              Small Image
            </SecondaryButton>
          </SizeButtons>
          <Disclaimer>
            If an uploaded image is already smaller than the above size, it will
            be re-downloaded as is.
          </Disclaimer>
        </Controls>
      </AppContainer>
    </>
  )
}

const AppContainer = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 3fr 1fr;
`

const Controls = styled.aside`
  display: block;
  align-self: center;
  justify-self: center;
  padding: 3rem;
  text-align: center;
`

const Heading = styled.h2`
  font-size: 3.6rem;
  font-weight: 500;
  margin-bottom: 3rem;

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
  margin-bottom: 3rem;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #869aff, #5468ff);
  padding: 1rem 4rem;
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
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
`

const SecondaryButton = styled(Button)`
  background: linear-gradient(180deg, #fff, #f5f5fa);
  color: #3a416f;
  margin: 0;
`
