import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'react-emotion'

import HeavenSelector from './HeavenSelector'
import DurationSelector from './DurationSelector'

import x3 from '../utils/x3'
import Button from '../ui/Button'

const Heading = styled.h1`
  margin-bottom: 0.2em;
  font-size: 2.3em;
  color: #333;

  @media (max-width: 800px) {
    font-size: 2.8em;
  }

  @media (max-width: 500px) {
    font-size: 2.2em;
  }
`

@observer
export default class SendHappiness extends Component {
  async componentDidMount() {
    await x3.fetchBalance()
  }

  async send() {
    await x3.sendHappiness(x3.duration, x3.strength)
  }

  render() {
    return (
      <div>
        <Heading>ราคา: {x3.pricing}</Heading>

        <DurationSelector />
        <HeavenSelector />

        <Button onClick={this.send} primary large>
          Send Happiness
        </Button>
      </div>
    )
  }
}
