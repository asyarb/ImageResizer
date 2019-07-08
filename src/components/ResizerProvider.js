import React from 'react'
import { map } from 'asyncro'
import { createStore, StoreProvider, action, thunk } from 'easy-peasy'
import Pica from 'pica'

import fs from 'fs'
import os from 'os'
import path from 'path'

const STAGE_ENUM = {
  INIT: 'INIT',
  RESIZING: 'RESIZING',
  UPLOADED_FILES: 'UPLOADED_FILES',
  FINISHED: 'FINISHED',
}
const { INIT, RESIZING, UPLOADED_FILES, FINISHED } = STAGE_ENUM

const state = {
  stage: FINISHED,
  files: [],
  resizeWidth: 2000,
}

const actions = {
  writeImageFile: action((state, { canvas, fileName, mimeType }) => {
    const imgBase64 = canvas.toDataURL(mimeType, 0.75)

    const data = imgBase64.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(data, 'base64')

    const userDownloadsDir = path.join(os.homedir(), 'Downloads')

    fs.writeFile(
      `${userDownloadsDir}/${state.resizeWidth}px_${fileName}`,
      buffer,
      err => {
        if (err) return
      }
    )
  }),

  setResizeWidth: action((state, payload) => ({
    ...state,
    resizeWidth: payload,
  })),

  setStage: action((state, payload) => ({
    ...state,
    stage: payload,
  })),

  setFiles: action((state, payload) => ({
    ...state,
    stage: UPLOADED_FILES,
    files: payload,
  })),

  resetFiles: action(state => ({
    ...state,
    stage: INIT,
    files: [],
  })),
}

const thunks = {
  resizeFiles: thunk(async (actions, _payload, { getState }) => {
    const { files } = getState()
    actions.setStage(RESIZING)

    await map(files, file => actions._resizeAndDownloadImage(file))
    actions.setStage(FINISHED)
  }),

  // @private
  _drawSrcCanvas: thunk(
    (_actions, payload, { getState }) =>
      new Promise((resolve, reject) => {
        const srcCanvas = document.createElement('canvas')
        const context = srcCanvas.getContext('2d')
        const { resizeWidth } = getState()

        const img = new Image()
        img.onload = () => {
          srcCanvas.width = img.width
          srcCanvas.height = img.height

          context.drawImage(img, 0, 0)

          if (img.width < resizeWidth) {
            console.log('rejected', img.width)
            reject(srcCanvas)
          }

          resolve(srcCanvas)
        }

        img.src = URL.createObjectURL(payload)
      })
  ),

  // @private
  _drawResizedCanvas: thunk(async (_actions, payload, { getState }) => {
    const pica = new Pica()
    const { resizeWidth } = getState()

    const scaleFactor = payload.width / resizeWidth
    const resizeHeight = payload.height / scaleFactor

    const destCanvas = document.createElement('canvas')
    destCanvas.width = resizeWidth
    destCanvas.height = resizeHeight
    const context = destCanvas.getContext('2d')

    await pica.resize(payload, destCanvas)
    context.drawImage(destCanvas, 0, 0)

    return destCanvas
  }),

  // @private
  _resizeAndDownloadImage: thunk(async (actions, payload) => {
    try {
      const srcCanvas = await actions._drawSrcCanvas(payload)
      const destCanvas = await actions._drawResizedCanvas(srcCanvas)

      await actions.writeImageFile({
        canvas: destCanvas,
        fileName: payload.name,
        mimeType: payload.type,
      })

      srcCanvas.remove()
      destCanvas.remove()
    } catch (errorCanvas) {
      console.log('errored', errorCanvas)
      await actions.writeImageFile({
        canvas: errorCanvas,
        fileName: payload.name,
        mimeType: payload.type,
      })
    }
  }),
}

const model = {
  ...state,
  ...actions,
  ...thunks,
}

const store = createStore(model)

export const ResizerProvider = ({ children }) => (
  <StoreProvider store={store}>{children}</StoreProvider>
)
