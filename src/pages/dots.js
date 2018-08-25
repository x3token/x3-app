import React, {Component} from 'react'
import styled from 'react-emotion'
import {opacify} from 'polished'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Layout from '../layout'

const size = 40
const count = 11
const spacing = 20

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Input = styled.input`
  position: fixed;
  bottom: ${props => props.bottom || 0.7}em;

  font-family: inherit;
  color: #555;
  border: none;
  font-size: 2.3em;
  font-weight: 300;
  outline: none;
  background: transparent;
`

const Circle = styled.div`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;

  background: ${props => props.color};
  box-shadow: 0px 0px 11px ${props => opacify(0.4, props.color)};

  margin-right: ${spacing}px;
  margin-bottom: ${spacing}px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: ${count * 60}px;
`

const primary = '#FF3366'
const dark = '#2d2d30'

const asciiToBinary = text => Array.from(text).map(x => {
  const bin = x.charCodeAt(0).toString(2)

  return Array(8 - bin.length + 1).join('0') + bin
}).join('')

const binaryToAscii = text => text.match(/.{1,8}/g).map(x => String.fromCharCode(parseInt(x, 2)).toString(10)).join('')

@observer
export default class Board extends Component {
  @observable
  colors = Array(count * count)
    .fill(true)
    .map((_, i) => i % 2 !== 0)

  componentDidMount() {
    window.dotsBoard = this
  }

  handleCircle = i => {
    this.colors[i] = !this.colors[i]
  }

  serialize = () => {
    return [...this.colors].map(x => (x ? 1 : 0)).join('')
  }

  load = data => {
    this.colors = data.split('').map(x => x === '1')
  }

  toAscii = () => binaryToAscii(this.serialize())

  loadAscii = data => this.load(data ? asciiToBinary(data) : '0')

  render() {
    return (
      <Layout>
        <Container>
          <Grid>
            {this.colors.map((color, i) => (
              <Circle
                key={i}
                color={color ? primary : dark}
                onClick={() => this.handleCircle(i)}
                onMouseOver={() => this.handleCircle(i)}
                onTouchStart={() => this.handleCircle(i)}
              />
            ))}
          </Grid>

          <Input
            onChange={e => this.load(e.target.value)}
            value={this.serialize()}
          />

          <Input
            bottom={2.1}
            onChange={e => this.loadAscii(e.target.value)}
            value={this.toAscii()}
          />
        </Container>
      </Layout>
    )
  }
}
