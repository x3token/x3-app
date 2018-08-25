import React, {Component} from 'react'
import styled from 'react-emotion'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import x3 from '../utils/x3'

import Button from '../ui/Button'

const vibrationStrength = [130, 150, 170, 190, 210, 230, 255]

const ButtonContainer = styled.div`
  display: flex;
  margin: 1.2em 0;
`

@observer
export default class HeavenSelector extends Component {
  @observable
  level = 0

  select = level => {
    const strength = vibrationStrength[level + 1]
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
            style={{marginRight: '1em'}}>
            สวรรค์ชั้น {level + 1}
          </Button>
        ))}
      </ButtonContainer>
    )
  }
}
