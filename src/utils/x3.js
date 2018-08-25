import {observable} from 'mobx'
import Eth from 'ethjs'

import eth from './eth'
import contract from './contract'

async function getAccount() {
  const accounts = await eth.accounts()

  return accounts[0]
}

class X3Store {
  @observable
  balance = 0

  async fetchBalance() {
    this.balance = await this.getBalance()
  }

  async getBalance() {
    const account = await getAccount()
    const [amount] = await contract.balanceOf(account)

    return amount.toNumber()
  }

  async buyToken(ether = 0.001) {
    const from = await getAccount()
    const value = Eth.toWei(ether, 'ether')

    const address = await contract.buyToken({from, value})
    await this.fetchBalance()

    return address
  }

  async sendHappiness(duration = 1000, strength = 150) {
    const from = await getAccount()

    if (duration > 20000) {
      throw new Error('Duration must be less than 20000 milliseconds.')
    }

    if (strength < 100 || strength > 255) {
      throw new Error('Strength must be between 100 and 255.')
    }

    const address = contract.sendHappiness(duration, strength, {from})
    await this.fetchBalance()

    return address
  }
}

const x3 = new X3Store()

if (typeof window !== 'undefined') {
  window.x3 = x3
}

export default x3
