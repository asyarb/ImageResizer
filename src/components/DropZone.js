import React, { useCallback } from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@emotion/styled/macro'
import { useSpring, a, config } from 'react-spring'

export const DropZone = props => {
  const stage = useStore(state => state.stage)
  const { setStage, setFilesSmart } = useActions(actions => ({
    setStage: actions.setStage,
    setFilesSmart: actions.setFilesSmart,
  }))

  const getCleanedFiles = useCallback(fileList => {
    const arr = Array.from(fileList)

    return arr.filter(file =>
      ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'].includes(file.type)
    )
  }, [])

  const handleDragLeave = useCallback(
    e => {
      e.preventDefault()
      setStage('INIT')
    },
    [setStage]
  )

  const handleDragOver = useCallback(
    e => {
      e.preventDefault()
      setStage('DRAGGING_OVER')
    },
    [setStage]
  )

  const handleDrop = useCallback(
    e => {
      e.preventDefault()

      const cleanedFiles = getCleanedFiles(e.dataTransfer.files)
      setFilesSmart(cleanedFiles)
    },
    [getCleanedFiles, setFilesSmart]
  )

  const handleFile = useCallback(
    e => {
      e.preventDefault()

      const cleanedFiles = getCleanedFiles(e.target.files)
      setFilesSmart(cleanedFiles)
    },
    [getCleanedFiles, setFilesSmart]
  )

  const shouldShowText = Boolean(stage === 'INIT')

  const animProps = useSpring({
    opacity: shouldShowText ? 1 : 0,
    transform: shouldShowText
      ? 'translate3d(0, 0px, 0)'
      : 'translate3d(0, 30px, 0)',
    config: config.gentle,
  })

  return (
    <DropZoneContainer
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      stage={stage}
      {...props}
    >
      <Heading style={animProps}>
        Drop images here, or <Label htmlFor="file">browse</Label> your computer
        instead.
      </Heading>

      <Input
        type="file"
        id="file"
        accepts="image/*"
        multiple={true}
        onInput={handleFile}
      />
    </DropZoneContainer>
  )
}

const DropZoneContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: ${p =>
    p.stage === 'INIT'
      ? '2px dashed #e2e8f0'
      : p.stage === 'DRAGGING_OVER'
      ? '2px dashed #4299E1'
      : null};
  border-radius: 50px;
`

const Heading = styled(a.h1)`
  font-size: 1.8rem;
  max-width: 25ch;
  margin: 0 auto;
  text-align: center;
  line-height: 1.75;
`

const Label = styled.label`
  color: #4299e1;
  cursor: pointer;
  transition: color 0.25s ease;
  font-weight: 700;

  &:hover,
  &:focus {
    color: #2b6cb0;
  }
`

const Input = styled.input`
  width: 0px;
  height: 0px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -100;
`
