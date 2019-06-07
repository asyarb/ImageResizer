import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    background: #fff;
    color: #2d3748;
    overflow-x: hidden;
    -webkit-app-region: drag;
  }

  a {
    text-decoration: none;
    font-weight: inherit;
    color: inherit;
    cursor: pointer;
  }

  button {
    font: inherit;
    background: transparent;
    border: none;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
`
