import Eth from 'ethjs'

const eth = new Eth(web3.currentProvider)

if (typeof window !== 'undefined') {
  window.Eth = Eth
  window.eth = eth
}

export default eth
