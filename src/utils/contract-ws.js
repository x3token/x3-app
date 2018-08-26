import web3ws from './web3-ws'

let contract = {}

if (typeof window !== 'undefined') {
  const X3Token = require('../../build/contracts/X3Token.json')
  const network = X3Token.networks[42]

  contract = new web3ws.eth.Contract(X3Token.abi, network.address)

  window.contractWs = contract
}

export default contract
