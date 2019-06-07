import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@xstyled/styled-components/macro'
import { useTrail, a, config } from 'react-spring'

const File = ({ file, src, name, ...props }) => {
  return (
    <FileContainer {...props}>
      <PreviewThumbnail src={src} />
      <Details>
        <FileName>{name}</FileName>
        {/* <div>
          {
            <>
              <Dimensions>
                Width: <strong>{height}px</strong>
              </Dimensions>
              <Dimensions>
                Height: <strong>{width}px</strong>
              </Dimensions>
            </>
          }
        </div> */}
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
            name={file.name}
            style={animFiles[index]}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div``

const FileContainer = styled(a.div)`
  margin: 1rem 2rem;
  display: flex;
  align-items: center;
`

const Heading = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 1rem 0;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 2px solid #e2e8f0;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #a0aec0;
`

const FileName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
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

const Text = styled.h1`
  font-weight: 600;
  font-size: 1.6rem;
  grid-column: 2;
  margin: 0;
`

const ResetButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  color: #fff;
  grid-column: 3;
  justify-self: end;
  margin-right: 1rem;
  padding: 0.5rem 2rem;
  background: linear-gradient(#fc8181, #e53e3e);
  border-radius: 8px;
  font-size: 1.5rem;
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
