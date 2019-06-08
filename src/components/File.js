import React, { useState, useEffect } from 'react'
import styled from '@xstyled/styled-components'
import { a } from 'react-spring'

export const File = ({ src, name, ...props }) => {
  const [dimensions, setDimensions] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
  }, [src])

  return (
    <FileContainer {...props}>
      <PreviewThumbnail src={src} />
      <Details>
        <FileName>{name}</FileName>
        <Dimensions>
          <Width>
            Width: <strong>{dimensions && dimensions.width}</strong>
          </Width>
          <Height>
            Height: <strong>{dimensions && dimensions.height}</strong>
          </Height>
        </Dimensions>
      </Details>
    </FileContainer>
  )
}

const FileContainer = styled(a.li)`
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  background-color: mainWindowBg;

  &:nth-of-type(2n) {
    background-color: fileLightBg;
  }
`

const PreviewThumbnail = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  object-position: center center;
  margin-right: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`

const Dimensions = styled.div`
  display: flex;
  font-size: tiny;
  color: arrowButton;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Width = styled.p`
  margin-right: 1rem;
  color: secondaryTextColor;

  strong {
    color: primaryTextColor;
    font-weight: 500;
  }
`

const Height = styled(Width)``

const FileName = styled.h3`
  font-size: normal;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: primaryTextColor;
`
