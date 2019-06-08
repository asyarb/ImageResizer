const { remote } = require('electron')
const { systemPreferences } = remote

process.once('loaded', () => {
  if (process.platform === 'darwin') {
    const setTheme = () => {
      const event = new Event('storage')
      localStorage.setItem(
        'osTheme',
        systemPreferences.isDarkMode() ? 'dark' : 'light'
      )

      window.dispatchEvent(event)
    }

    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      setTheme
    )

    setTheme()
  } else {
    localStorage.setItem('osTheme', 'windows')
  }
})
