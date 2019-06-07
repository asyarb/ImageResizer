import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import 'minireset.css'

import { ResizerProvider } from './components/ResizerProvider'
import { ThemeProvider } from './components/ThemeProvider'

ReactDOM.render(
  <ResizerProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ResizerProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
