import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Pica from 'pica'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'

import fs from 'fs'
import os from 'os'
import path from 'path'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export const ImageResizer = ({ resizeWidth }) => {
  const [pica] = useState(() => new Pica())
  const [uppy, setUppy] = useState(null)

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

  const downloadCanvasImageNode = useCallback(
    async ({ canvas, fileName, mimeType }) => {
      const imgBase64 = canvas.toDataURL(mimeType, 0.75)

      const data = imgBase64.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(data, 'base64')

      const userDownloadsDir = path.join(os.homedir(), 'Downloads')

      fs.writeFile(
        `${userDownloadsDir}/${resizeWidth}px_${fileName}`,
        buffer,
        err => {
          if (err) return
        }
      )
    },
    [resizeWidth]
  )

  const resizeAndDownloadImage = useCallback(
    async file => {
      try {
        const srcCanvas = await drawSrcCanvas(file)
        const destCanvas = await drawResizedCanvas(srcCanvas)

        await downloadCanvasImageNode({
          canvas: destCanvas,
          fileName: file.name,
          mimeType: file.type,
        })

        srcCanvas.remove()
        destCanvas.remove()
      } catch (errorCanvas) {
        await downloadCanvasImageNode({
          canvas: errorCanvas,
          fileName: file.name,
        })
      }
    },
    [downloadCanvasImageNode, drawResizedCanvas, drawSrcCanvas]
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
      note={`Uploading an image will resize it to ${resizeWidth}px then download it to your computer's "Downloads" folder.`}
      locale={{
        strings: {
          dropPaste: 'Drag and drop, paste, or %{browse} for images here.',
        },
      }}
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
