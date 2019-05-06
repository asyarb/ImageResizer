import React from 'react'
import styled from '@emotion/styled/macro'
import { keyframes } from '@emotion/core'

const cubeAnimation = keyframes`
   0%, 70%, 100% {    
    transform: scale3D(1, 1, 1);
  } 35% {
    transform: scale3D(0, 0, 1);
  } 
`

export const Spinner = ({ size = '4rem', ...props }) => (
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
  font-size: 3rem;
  font-weight: 500;
`

const Grid = styled.div`
  width: ${p => p.size};
  height: ${p => p.size};
  margin-bottom: 3rem;
`

const Cube = styled.div`
  width: 27%;
  height: 27%;
  background-color: #81e6d9;
  float: left;
  animation: ${cubeAnimation} 1.3s infinite ease-in-out;
  margin: 2%;

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
