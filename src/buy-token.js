import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'react-emotion'
import {observable} from 'mobx'
import Eth from 'ethjs'

import x3 from './utils/x3'

import Input from './ui/Input'
import Button from './ui/Button'

const rate = Eth.toBN(1e11)

const Heading = styled.h1`
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
export default class BuyToken extends Component {
  @observable
  ether = '0.01'

  get toXTN() {
    return Eth.toWei(this.ether, 'ether')
      .div(rate)
      .toString()
  }

  handleChange = e => {
    this.ether = e.target.value
  }

  refresh = () => x3.fetchBalance()

  buyToken = async () => {
    console.log('[X3] Exchanging', this.ether, 'Ether for', this.toXTN, 'XTN')

    await x3.buyToken(this.ether)
  }

  render() {
    return (
      <div>
        <Heading>{x3.balance} XTN</Heading>

        <Button onClick={this.refresh} info>
          Refresh
        </Button>

        <br />

        <div>
          {this.ether} Ether {'=>'} {this.toXTN} XTN
        </div>

        <div style={{margin: '1.2em 0'}}>
          <Input value={this.ether} onChange={this.handleChange} />
        </div>

        <Button onClick={this.buyToken} primary>
          Buy Token
        </Button>
      </div>
    )
  }
}
