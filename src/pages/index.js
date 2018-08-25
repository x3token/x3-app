import React, {Component} from 'react'
import styled from 'react-emotion'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Tabs from '../ui/Tabs'
import Paper from '../ui/Paper'

import Layout from '../layout'
import BuyToken from '../buy-token'
import SendHappiness from '../send-happiness'

const Backdrop = styled.div`
  width: 100%;
  min-height: 100vh;

  background: linear-gradient(45deg, #d4145a, #fbb03b);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
`

const tabs = ['Buy', 'Send']

const Card = styled(Paper)`
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
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
      <Layout>
        <Backdrop>
          <Container>
            <Tabs tab={this.tab} tabs={tabs} go={this.go} color="#d4145a" />
            <Card>
              {this.tab === 'Buy' && <BuyToken />}
              {this.tab === 'Send' && <SendHappiness />}
            </Card>
          </Container>
        </Backdrop>
      </Layout>
    )
  }
}
