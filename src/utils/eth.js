import Eth from 'ethjs'

let eth = {}

if (typeof window !== 'undefined') {
  eth = new Eth(web3.currentProvider)

  window.Eth = Eth
  window.eth = eth
}

export default eth
