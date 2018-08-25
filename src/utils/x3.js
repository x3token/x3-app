import {observable, action} from 'mobx'
import Eth from 'ethjs'

import eth from './eth'
import contract from './contract'

function getPriceRange(strength) {
  if (strength > 230) return 7
  if (strength > 210) return 6
  if (strength > 190) return 5
  if (strength > 170) return 4
  if (strength > 150) return 3
  if (strength > 130) return 2

  return 1
}

async function getAccount() {
  const accounts = await eth.accounts()

  return accounts[0]
}

function calculatePricing(duration, strength) {
  return duration * getPriceRange(strength)
}

class X3Store {
  @observable
  balance = 0

  @observable
  duration = 0

  @observable
  strength = 0

  @action
  setDuration(duration) {
    this.duration = parseInt(duration, 10) || 0
  }

  @action
  setStrength(duration) {
    this.strength = parseInt(duration, 10) || 0
  }

  @action
  async fetchBalance() {
    this.balance = await this.getBalance()
  }

  get pricing() {
    return calculatePricing(this.duration, this.strength)
  }

  async getBalance() {
    const account = await getAccount()
    const [amount] = await contract.balanceOf(account)

    return amount.toNumber()
  }

  async buyToken(ether = 0.001) {
    const from = await getAccount()
    const value = Eth.toWei(ether, 'ether')

    return contract.buyToken({from, value})
  }

  async sendHappiness(duration = 1000, strength = 150) {
    const from = await getAccount()

    if (duration > 20000) {
      throw new Error('Duration must be less than 20000 milliseconds.')
    }

    if (strength < 130 || strength > 255) {
      throw new Error('Strength must be between 130 and 255.')
    }

    console.log('[X3] Sending -- Duration:', duration, 'Strength:', strength)

    return contract.sendHappiness(duration, strength, {from})
  }
}

const x3 = new X3Store()

if (typeof window !== 'undefined') {
  window.x3 = x3
}

export default x3
