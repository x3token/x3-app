import React, {Component} from 'react'
import styled from 'react-emotion'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Tabs from '../ui/Tabs'
import Paper from '../ui/Paper'

import BuyToken from '../buy-token'
import SendHappiness from '../send-happiness'

const Backdrop = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

const tabs = ['Buy', 'Send']

const Card = styled(Paper)`
  width: 100%;
`

@observer
export default class Landing extends Component {
  @observable
  tab = 'Buy'

  go = tab => {
    this.tab = tab
  }

  render() {
    return (
      <Backdrop>
        <Container>
          <Tabs tab={this.tab} tabs={tabs} go={this.go} color="#d4145a" />
          <Card>
            {this.tab === 'Buy' && <BuyToken />}
            {this.tab === 'Send' && <SendHappiness />}
          </Card>
        </Container>
      </Backdrop>
    )
  }
}
