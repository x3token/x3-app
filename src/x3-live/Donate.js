import React, {Component} from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Sticker = styled.img`
  min-width: 10em;
  max-width: 10em;
  max-height: 10em;

  cursor: pointer;
`

export default class Donate extends Component {
  render() {
    return (
      <Container>
        {Array.from({length: 10}).map((_, i) => (
          <Sticker
            key={i}
            src={require(`../images/xstickers/${i}.png`)}
            onClick={() => this.props.send(i)}
          />
        ))}
      </Container>
    )
  }
}
