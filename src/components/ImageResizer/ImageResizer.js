import React from 'react'
import Pica from 'pica'

export const ImageResizer = () => {
  const [pica] = React.useState(() => new Pica())
  const img = React.useRef()
  const canvasRef = React.useRef()

  img.current = new Image()

  const getSrcCanvas = ({ file }) =>
    new Promise(resolve => {
      const srcCanvas = document.createElement('canvas')
      const context = srcCanvas.getContext('2d')

      img.current.onload = () => {
        srcCanvas.width = img.current.width
        srcCanvas.height = img.current.height

        context.drawImage(img.current, 0, 0)

        resolve(srcCanvas)
      }

      img.current.src = URL.createObjectURL(file)
    })

  const drawResizedCanvas = async srcCanvas => {
    // resize the image and store it in canvasRef's buffer
    await pica.resize(srcCanvas, canvasRef.current)

    // now draw the resize buffer
    const context = canvasRef.current.getContext('2d')
    context.drawImage(canvasRef.current, 0, 0)

    // TODO:
    // Instead of drawing to canvasRef.current, draw it to another offscreen canvas
    // Then use toBlob() to get a downloadable blob file.
  }

  const handleFileUpload = async event => {
    // TODO: handle bad/cancelled uploads
    const [file] = event.target.files

    // draw the uploaded file to an offscreen canvas
    const srcCanvas = await getSrcCanvas({ file })
    await drawResizedCanvas(srcCanvas)
  }

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileUpload}
      />
      <canvas
        width="400px"
        height="300px"
        ref={canvasRef}
        style={{ background: 'black', marginRight: '50px' }}
      />
    </>
  )
}
