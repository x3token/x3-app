import React from 'react'
import styled from 'react-emotion'

import X3Token from '../../contracts/X3Token.sol'

import Layout from '../layout'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @media (min-width: 800px) {
    border: 20px solid #2d2d30;
  }
`

const Heading = styled.h1`
  font-size: 4.3em;
  color: #333;

  @media (max-width: 800px) {
    font-size: 2.8em;
  }

  @media (max-width: 500px) {
    font-size: 2.2em;
  }
`

const SubHeading = styled.h2`
  margin-top: 1.8em;
  font-size: 1.8em;
  color: #555;
  font-weight: 300;

  @media (max-width: 800px) {
    font-size: 1.3em;
  }
`

const Strong = styled.strong`
  color: inherit;
`

const Landing = () => (
  <Layout>
    <Container>
      <Heading>
        <Strong>PHOOMPARIN</Strong>
        MANO
      </Heading>

      <SubHeading>
        <Strong>COMING SOON;</Strong> STAY TUNED.
      </SubHeading>
    </Container>
  </Layout>
)

export default Landing
