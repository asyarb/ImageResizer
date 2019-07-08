import React from 'react'
import styled from '@xstyled/styled-components'
import Lottie from 'react-lottie'

import animationJson from '../assets/checked-lottie.json'

export const Success = () => {
  return (
    <Container>
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
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const SuccessContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
`

const Message = styled.div`
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
