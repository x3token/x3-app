import React, {Component} from 'react'
import Webcam from 'react-webcam'
import styled from 'react-emotion'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

import contractWs from '../utils/contract-ws'

import Donate from './Donate'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  margin: 0 auto;
  max-width: 800px;
`

const Camera = styled(Webcam)`
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const OverlayContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  opacity: ${props => (props.visible ? 1 : 0)};
`

const Sticker = styled.img`
  max-width: 15em;
`

const LiveIndicator = styled.div`
  position: absolute;
  left: 1em;
  top: 1em;

  color: white;
  font-size: 1.5em;
  background: #e74c3c;

  cursor: pointer;
  padding: 0em 0.8em;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  z-index: 2;
`

const Notice = styled.div`
  color: white;
  text-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  font-size: 2.8em;
`

@observer
export default class X3Live extends Component {
  @observable
  visible = false

  @observable
  sticker = 0

  async componentDidMount() {
    const vibrating = contractWs.events.VibratingEvent()

    vibrating.on('data', async event => {
      const {duration, strength} = event.returnValues

      console.log('VibratingEvent:', duration, strength)
    })
  }

  @action
  toggle = () => {
    this.visible = !this.visible
  }

  @action
  select = sticker => {
    this.sticker = sticker
  }

  render() {
    return (
      <div>
        <Container>
          <LiveIndicator onClick={this.toggle}>LIVE</LiveIndicator>

          <OverlayContainer
            visible={this.visible}
            className="animated bounce infinite">
            <Sticker src={require(`../images/xstickers/${this.sticker}.png`)} />

            <Notice>ได้รับสวรรค์ชั้น 7 ไป 2 วินาที!</Notice>
          </OverlayContainer>

          <Camera />
        </Container>

        <Donate select={this.select} />
      </div>
    )
  }
}
