import React from 'react'
import styled from '@xstyled/styled-components'
import Lottie from 'react-lottie'

import animationJson from '../assets/checked-lottie.json'

export const Success = () => {
  return (
    <SuccessContainer>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationJson,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={150}
        width={250}
        isStopped={false}
        isPaused={false}
      />
      <Message>
        <Heading>Success!</Heading>
        <Text>Your images are in your downloads folder.</Text>
      </Message>
    </SuccessContainer>
  )
}

const SuccessContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  place-items: end center;
  height: 100%;
`

const Message = styled.div`
  padding-bottom: 18%;
  text-align: center;
`

const Heading = styled.h2`
  color: green.70;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  font-size: large;
`

const Text = styled.p`
  color: primaryTextColor;
  max-width: 30ch;
  text-align: center;
  margin: 0 auto;
  font-size: normal;
  line-height: copy;
  font-weight: 500;
`
