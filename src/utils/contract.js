import eth from './eth'

let contract = {}

if (typeof window !== 'undefined') {
  let X3Token = {}

  if (process.env.NODE_ENV === 'development') {
    X3Token = require('../../contracts/X3Token.sol')
  } else {
    X3Token = require('../../build/contracts/X3Token.json')
  }

  const id = process.env.NODE_ENV === 'production' ? 42 : 5777
  const network = X3Token.networks[id]

  contract = eth.contract(X3Token.abi).at(network.address)

  window.contract = contract
}

export default contract
