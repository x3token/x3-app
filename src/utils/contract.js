import eth from './eth'

let contract = {}

if (typeof window !== 'undefined') {
  let X3Token = {}

  if (process.env.NODE_ENV === 'development') {
    X3Token = require('../../contracts/X3Token.sol')
  } else {
    X3Token = require('../../build/contracts/X3Token.json')
  }

  // Private Net: 5777
  let id = 42

  if (process.env.NODE_ENV === 'production') {
    id = 42
  }

  const network = X3Token.networks[id]

  console.log('[X3] Using Network', id, network)

  contract = eth.contract(X3Token.abi).at(network.address)

  window.contract = contract
}

export default contract
