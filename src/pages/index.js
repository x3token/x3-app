import React, {Component} from 'react'
import styled from 'react-emotion'

import x3 from '../utils/x3'
import contract from '../utils/contract'

import Layout from '../layout'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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

class Landing extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <Heading>X3Token</Heading>
        </Container>
      </Layout>
    )
  }
}

export default Landing
