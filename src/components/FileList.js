import React from 'react'
import { useStore } from 'easy-peasy'
import styled from '@xstyled/styled-components'
import { useTrail, config } from 'react-spring'

import { File } from './File'
import { macOSLightTheme as lt } from '../themes/macOSLight'

export const FileList = () => {
  const files = useStore(state => state.files)

  const animFiles = useTrail(files.length, {
    from: { transform: 'translate3d(-40px, 0, 0)', opacity: 0 },
    to: { transform: 'translate3d(0px, 0, 0)', opacity: 1 },
    config: config.gentle,
  })

  return (
    <FileListContainer>
      <HeadingBar>
        <Text>Pending Images</Text>
      </HeadingBar>

      <Files>
        {files.map((file, index) => {
          const src = URL.createObjectURL(file)

          return (
            <File
              key={file.name}
              src={src}
              name={file.name}
              style={animFiles[index]}
            />
          )
        })}
      </Files>
    </FileListContainer>
  )
}

const FileListContainer = styled.div`
  display: grid;
  grid-template-rows: 38px calc(100vh - (3.8rem * 2));
`

const HeadingBar = styled.header`
  display: grid;
  place-items: center;
  border-bottom: windowBorder;
  background: linear-gradient(${lt.colors.window[80]}, ${lt.colors.window[60]});
`

const Files = styled.ul`
  height: 100%;
  overflow-y: scroll;
`

const Text = styled.h1`
  font-weight: 500;
  font-size: small;
  margin: 0 auto;
`
