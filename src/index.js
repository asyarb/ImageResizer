import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import 'minireset.css'
import 'typeface-inter'

import { ResizerProvider } from './components/ResizerProvider'

ReactDOM.render(
  <ResizerProvider>
    <App />
  </ResizerProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
