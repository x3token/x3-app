import React, {Component} from 'react'
import {action} from 'mobx'

import x3 from '../utils/x3'

import Donate from './Donate'
import Camera from './Camera'

const strengths = [130, 150, 170, 190, 210, 230, 255]

export default class X3View extends Component {
  @action
  send = async index => {
    const strength = strengths[index] || 255
    console.log('Sending Happiness:', index, strength)

    await x3.sendHappiness(x3.duration, strength)
  }

  render() {
    return (
      <div>
        <Camera />
        <Donate send={this.send} />
      </div>
    )
  }
}
