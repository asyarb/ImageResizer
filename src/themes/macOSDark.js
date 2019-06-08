import { macOSLightTheme } from './macOSLight'

export const macOSDarkTheme = {
  ...macOSLightTheme,
  colors: {
    white: '#fff',
    black: 'rgb(28, 28, 28)',
    primaryTextColor: 'rgb(251, 254, 255)',
    secondaryTextColor: 'rgb(223, 224, 224)',
    secondaryButtonBg: 'rgb(104, 107, 108)',
    arrowBg: 'rgb(150, 150, 150)',
    secondaryButtonActive: 'rgb(123, 124, 125)',
    fileLightBg: 'rgb(55, 59, 61)',
    controlsBarBg: 'rgb(54, 57, 59)',
    mainWindowBg: 'rgb(49, 51, 54)',
    dropZoneBg: 'rgb(34, 38, 43)',
    headerBgGradient: 'linear-gradient(rgb(66, 70, 73), rgb(54, 58, 60))',
    blue: {
      90: 'rgb(108, 179, 250)',
      80: 'rgb(8, 126, 255)',
      70: 'rgb(59, 120, 248)',
      60: 'rgb(76, 152, 254)',
      50: 'rgb(5, 100, 227)',
    },
    green: {
      90: '#68d391',
      80: '#38a169',
      70: '#4bb172',
      60: '#298e58',
    },
  },
  borders: {
    primaryButtonBorder: '1px solid rgb(36, 127, 255)',
    secondaryButtonBorder: '1px solid rgb(53, 54, 56)',
    windowBorder: '1px solid rgb(0, 0, 0)',
    confirmButtonBorder: '1px solid #38a169',
  },
}
