import React, {Component} from 'react'
import {observer} from 'mobx-react'

import x3 from '../utils/x3'

import Input from '../ui/Input'

@observer
export default class DurationSelector extends Component {
  render() {
    return (
      <div>
        <Input
          value={x3.duration}
          onChange={e => x3.setDuration(e.target.value)}
        />
      </div>
    )
  }
}
