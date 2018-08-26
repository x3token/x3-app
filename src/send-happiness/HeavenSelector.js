import React, {Component} from 'react'
import styled from 'react-emotion'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import x3 from '../utils/x3'

import Button from '../ui/Button'

const strengths = [130, 150, 170, 190, 210, 230, 255]

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.8em 0;
`

@observer
export default class HeavenSelector extends Component {
  @observable
  level = 0

  select = level => {
    const strength = strengths[level]
    this.level = level

    x3.setStrength(strength)
  }

  render() {
    return (
      <ButtonContainer>
        {Array.from({length: 7}).map((_, level) => (
          <Button
            key={level}
            onClick={() => this.select(level)}
            success={this.level === level}
            style={{
              marginRight: '1em',
              marginBottom: '0.5em',
              marginTop: '0.5em',
            }}>
            สวรรค์ชั้น {level + 1}
          </Button>
        ))}
      </ButtonContainer>
    )
  }
}
