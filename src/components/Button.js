import React from 'react'
import styled, { css } from '@xstyled/styled-components'

import { macOSLightTheme as lt } from '../themes/macOSLight'

const getColorScheme = type => {
  switch (type) {
    case 'primary':
      return {
        background: `linear-gradient(${lt.colors.blue[90]}, ${
          lt.colors.blue[80]
        })`,
        color: 'white',
        border: 'primaryButtonBorder',
        activeBg: `linear-gradient(${lt.colors.blue[60]}, ${
          lt.colors.blue[50]
        })`,
      }
    case 'secondary':
      return {
        background: 'white',
        color: 'black',
        border: 'secondaryButtonBorder',
        activeBg: lt.colors.gray[90],
      }

    default:
      return
  }
}

export const Button = ({ children, type = 'primary', ...props }) => {
  const colorScheme = getColorScheme(type)

  return (
    <ButtonContainer colorScheme={colorScheme} {...props}>
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button`
  ${p => css`
    display: block;
    padding: 0.25rem 1.25rem;
    background: ${p.colorScheme.background};
    color: ${p.colorScheme.color};
    font-weight: 500;
    border-radius: 5px;
    outline: none;
    font-size: small;
    border: ${p.colorScheme.border};
    box-shadow: button;

    &:active {
      background: ${p.colorScheme.activeBg};
    }
  `}
`
