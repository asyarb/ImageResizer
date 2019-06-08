import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from '@xstyled/styled-components'
import { useSpring, a, config } from 'react-spring'

import { ReactComponent as ArrowIconBG } from '../assets/arrow-down-circle.svg'

export const DropZone = props => {
  const stage = useStore(state => state.stage)
  const { setStage, setFilesSmart } = useActions(actions => ({
    setStage: actions.setStage,
    setFilesSmart: actions.setFilesSmart,
  }))

  const getCleanedFiles = fileList => {
    const arr = Array.from(fileList)

    return arr.filter(file =>
      ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'].includes(file.type)
    )
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setStage('INIT')
  }

  const handleDragOver = e => {
    e.preventDefault()
    setStage('DRAGGING_OVER')
  }

  const handleDrop = e => {
    e.preventDefault()

    const cleanedFiles = getCleanedFiles(e.dataTransfer.files)
    setFilesSmart(cleanedFiles)
  }

  const handleFile = e => {
    e.preventDefault()

    const cleanedFiles = getCleanedFiles(e.target.files)
    setFilesSmart(cleanedFiles)
  }

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
        Drop images here, or <Label htmlFor="file">browse</Label> for files.
      </Heading>

      <Input
        type="file"
        id="file"
        accepts="image/*"
        multiple={true}
        onInput={handleFile}
      />

      <ArrowIconBG />
    </DropZoneContainer>
  )
}

const DropZoneContainer = styled.div`
  display: grid;
  background-color: dropZoneBg;
  position: relative;
  place-items: center;
  height: 100%;
  border-radius: 25px;
  box-shadow: inset;

  > svg {
    position: absolute;
    width: 80%;
    height: 80%;
    opacity: 0.15;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: arrowBg;
    z-index: 1;
  }
`

const Heading = styled(a.h1)`
  font-size: medium;
  font-weight: 500;
  max-width: 20ch;
  text-align: center;
  line-height: 1.75;
  position: relative;
  z-index: 3;
  color: primaryTextColor;
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
