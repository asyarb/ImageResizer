import React from 'react'
import { saveAs } from 'file-saver'
import Pica from 'pica'

// TODO: handle bad/cancelled uploads
// TODO: Better image compression with pica. Images can be bigger post resize LOL
export const ImageResizer = () => {
  const [pica] = React.useState(() => new Pica())

  // Given an image File, returns a canvas with that Image
  // drawn to it.
  const drawSrcCanvas = file =>
    new Promise(resolve => {
      const srcCanvas = document.createElement('canvas')
      const context = srcCanvas.getContext('2d')

      const img = new Image()
      img.onload = () => {
        srcCanvas.width = img.width
        srcCanvas.height = img.height

        context.drawImage(img, 0, 0)

        resolve(srcCanvas)
      }

      img.src = URL.createObjectURL(file)
    })

  // Given a canvas with an image, resizes the image and returns
  // a new canvas with the same image with a smaller width and correct
  // aspect ratio.
  const drawResizedCanvas = async canvas => {
    const desiredWidth = 600
    const scaleFactor = canvas.width / desiredWidth
    const desiredHeight = canvas.height / scaleFactor

    const destCanvas = document.createElement('canvas')
    destCanvas.width = desiredWidth
    destCanvas.height = desiredHeight
    const context = destCanvas.getContext('2d')

    await pica.resize(canvas, destCanvas)
    context.drawImage(destCanvas, 0, 0)

    return destCanvas
  }

  const downloadCanvasImage = async canvas => {
    const blob = await pica.toBlob(canvas)

    saveAs(blob, 'resized-image.png')
  }

  const handleFileUpload = async event => {
    const [file] = event.target.files

    const srcCanvas = await drawSrcCanvas(file)
    const destCanvas = await drawResizedCanvas(srcCanvas)

    await downloadCanvasImage(destCanvas)

    srcCanvas.remove()
    destCanvas.remove()
  }

  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={handleFileUpload}
    />
  )
}
