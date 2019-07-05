const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require('electron-updater')
const isDev = require('electron-is-dev')
const log = require('electron-log')
const path = require('path')

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

let mainWindow

const createWindow = () => {
  autoUpdater.checkForUpdatesAndNotify()
  mainWindow = new BrowserWindow({
    width: 600,
    height: 480,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
    backgroundColor: '#fff',
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
