import eth from './eth'

import X3Token from '../../contracts/X3Token.sol'

let contract = {}

if (typeof window !== 'undefined') {
  const id = process.env.NODE_ENV === 'production' ? 42 : 5777
  const network = X3Token.networks[id]

  contract = eth.contract(X3Token.abi).at(network.address)

  window.contract = contract
}

export default contract
