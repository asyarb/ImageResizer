const { remote } = require('electron')

process.once('loaded', () => {
  if (process.platform === 'darwin') {
    const { systemPreferences } = remote

    const setTheme = () => {
      localStorage.setItem(
        'osTheme',
        systemPreferences.isDarkMode() ? 'dark' : 'light'
      )
    }

    systemPreferences.subscribeNotification(
      'AppleInterfacethemeChangedNotification',
      setTheme
    )

    setTheme()
  } else {
    localStorage.setItem('osTheme', 'windows')
  }
})
