import React from 'react'
import { Global, css } from '@emotion/core'

import { theme as t } from '../theme'

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
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
          background: ${t.c.white};
          color: ${t.c.black};
          overflow-x: hidden;
        }
        a {
          text-decoration: none;
          font-weight: inherit;
          color: inherit;
          cursor: pointer;
        }
      `}
    />
  )
}
