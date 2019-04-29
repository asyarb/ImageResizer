import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'
import Pica from 'pica'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export const ImageResizer = ({ resizeWidth }) => {
  const [pica] = useState(() => new Pica())
  const [uppy, setUppy] = useState(null)

  // Given an image File, returns a canvas with that Image
  // drawn to it.
  const drawSrcCanvas = useCallback(
    file =>
      new Promise((resolve, reject) => {
        const srcCanvas = document.createElement('canvas')
        const context = srcCanvas.getContext('2d')

        const img = new Image()
        img.onload = () => {
          srcCanvas.width = img.width
          srcCanvas.height = img.height

          context.drawImage(img, 0, 0)

          if (img.width < resizeWidth) {
            reject(srcCanvas)
          }

          resolve(srcCanvas)
        }

        img.src = URL.createObjectURL(file)
      }),
    [resizeWidth]
  )

  // Given a canvas with an image, resizes the image and returns
  // a new canvas with the same image with a smaller width and correct`
  // aspect ratio.
  const drawResizedCanvas = useCallback(
    async canvas => {
      const scaleFactor = canvas.width / resizeWidth
      const resizedHeight = canvas.height / scaleFactor

      const destCanvas = document.createElement('canvas')
      destCanvas.width = resizeWidth
      destCanvas.height = resizedHeight
      const context = destCanvas.getContext('2d')

      await pica.resize(canvas, destCanvas)
      context.drawImage(destCanvas, 0, 0)

      return destCanvas
    },
    [pica, resizeWidth]
  )

  const downloadCanvasImage = useCallback(
    async canvas => {
      const blob = await pica.toBlob(canvas, 'image/jpeg', 0.75)

      saveAs(blob, 'resized-image.jpg')
    },
    [pica]
  )

  const resizeAndDownloadImage = useCallback(
    async file => {
      try {
        const srcCanvas = await drawSrcCanvas(file)
        const destCanvas = await drawResizedCanvas(srcCanvas)

        await downloadCanvasImage(destCanvas)

        srcCanvas.remove()
        destCanvas.remove()
      } catch (errorCanvas) {
        // If there is an error, just download the same image back.
        await downloadCanvasImage(errorCanvas)
      }
    },
    [downloadCanvasImage, drawResizedCanvas, drawSrcCanvas]
  )

  const handleFileUpload = useCallback(
    async uppyFile => {
      const file = uppyFile.data

      await resizeAndDownloadImage(file)
    },
    [resizeAndDownloadImage]
  )

  useEffect(() => {
    const newUppy = Uppy({
      restrictions: {
        allowedFileTypes: ['image/*'],
      },
    })
    newUppy.on('file-added', handleFileUpload)

    setUppy(newUppy)
  }, [handleFileUpload, resizeWidth])

  return uppy ? (
    <Dashboard
      uppy={uppy}
      hideUploadButton={true}
      width="100%"
      height="100vh"
      proudlyDisplayPoweredByUppy={false}
      note={`Providing an image will resize it to ${resizeWidth}px then download it to your computer.`}
    />
  ) : (
    <Placeholder />
  )
}

ImageResizer.propTypes = {
  resizeWidth: PropTypes.number.isRequired,
}

const Placeholder = styled.div`
  width: 100%;
  height: 100vh;
  background: #fafafa;
`
