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
        height={450}
        width={450}
        isStopped={false}
        isPaused={false}
      />
      <Message>
        <Heading>Success!</Heading>
        <Text>
          Your images have been resized and placed in your downloads folder.
        </Text>
      </Message>
    </SuccessContainer>
  )
}

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
`

const Message = styled.div`
  position: absolute;
  bottom: 8rem;
`

const Heading = styled.h2`
  color: #48bb78;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.4rem;
  font-size: large;
`

const Text = styled.p`
  color: #718096;
  max-width: 30ch;
  text-align: center;
  margin: 0 auto;
  font-size: medium;
  line-height: 1.75;
`
