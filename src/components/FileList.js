import React, { useRef, useEffect, useState } from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@emotion/styled/macro'
import { useTrail, a, config } from 'react-spring'
import prettyBytes from 'pretty-bytes'

const File = ({ file, src, ...props }) => {
  const imgRef = useRef()
  const [dimensions, setDimensions] = useState(null)
  const { name, size } = file
  const sizeString = () => prettyBytes(size)

  useEffect(() => {
    const imgDomNode = imgRef.current
    if (imgDomNode)
      setDimensions({
        height: imgDomNode.naturalHeight,
        width: imgDomNode.naturalWidth,
      })
  }, [imgRef])

  return (
    <FileContainer {...props}>
      <PreviewThumbnail src={src} ref={imgRef} />
      <Details>
        <FileName>{name}</FileName>
        <div>
          <FileSize>
            Size: <strong>{sizeString}</strong>
          </FileSize>

          {dimensions && (
            <>
              <Dimensions>
                Width: <strong>{dimensions.height}px</strong>
              </Dimensions>
              <Dimensions>
                Height: <strong>{dimensions.width}px</strong>
              </Dimensions>
            </>
          )}
        </div>
      </Details>
    </FileContainer>
  )
}

export const FileList = props => {
  const files = useStore(state => state.files)
  const resetFiles = useActions(actions => actions.resetFiles)

  const animFiles = useTrail(files.length, {
    from: { transform: 'translate3d(-40px, 0, 0)', opacity: 0 },
    to: { transform: 'translate3d(0px, 0, 0)', opacity: 1 },
    config: config.gentle,
  })

  return (
    <Container {...props}>
      <Heading>
        <Text>Pending Images</Text>
        <ResetButton onClick={resetFiles}>Cancel</ResetButton>
      </Heading>

      {files.map((file, index) => {
        const src = URL.createObjectURL(file)

        return (
          <File
            key={file.name}
            file={file}
            src={src}
            style={animFiles[index]}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem 0;
  position: relative;
`

const FileContainer = styled(a.div)`
  padding: 1rem 2rem;
  display: flex;
`

const Heading = styled.div`
  display: grid;
  justify-items: center;
  padding-bottom: 2rem;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 1rem;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #a0aec0;
`

const FileName = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  color: #2d3748;
`

const FileSize = styled.div`
  strong {
    color: #ed8936;
    font-weight: 500;
  }
`

const Dimensions = styled(FileSize)`
  strong {
    color: #9f7aea;
  }
`

const PreviewThumbnail = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center center;
  margin-right: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`

const Text = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  grid-column: 2;
`

const ResetButton = styled.button`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  color: #fff;
  grid-column: 3;
  justify-self: end;
  margin-right: 2rem;
  padding: 1rem 2rem;
  background: linear-gradient(#fc8181, #e53e3e);
  border-radius: 25px;
  box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
  outline: none;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus {
    box-shadow: 0 8px 22px 0 rgba(37, 44, 97, 0.15),
      0 4px 6px 0 rgba(93, 100, 148, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`
