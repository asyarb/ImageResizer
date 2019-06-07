import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { keyframes } from 'styled-components'

const cubeAnimation = keyframes`
   0%, 70%, 100% {    
    transform: scale3D(1, 1, 1);
  } 35% {
    transform: scale3D(0, 0, 1);
  } 
`

export const Spinner = ({ size = '3rem', ...props }) => (
  <SpinnerContainer>
    <Grid size={size} {...props}>
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
    </Grid>
    <Label>Resizing...</Label>
  </SpinnerContainer>
)

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Label = styled.h2`
  font-size: medium;
  font-weight: 500;
  margin-top: 2rem;
`

const Grid = styled.div`
  ${p => css`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.2rem;
    width: ${p.size};
    height: ${p.size};
  `}
`

const Cube = styled.div`
  background-color: blue.90;
  animation: ${cubeAnimation} 1.5s infinite ease-in-out;

  &:nth-of-type(1) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.3s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
  &:nth-of-type(4) {
    animation-delay: 0.1s;
  }
  &:nth-of-type(5) {
    animation-delay: 0.2;
  }
  &:nth-of-type(6) {
    animation-delay: 0.3s;
  }
  &:nth-of-type(7) {
    animation-delay: 0s;
  }
  &:nth-of-type(8) {
    animation-delay: 0.1s;
  }
  &:nth-of-type(9) {
    animation-delay: 0.2s;
  }
`
