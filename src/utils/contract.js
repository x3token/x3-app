import eth from './eth'

import X3Token from '../../contracts/X3Token.sol'

let contract = {}

if (typeof window !== 'undefined') {
  contract = eth.contract(X3Token.abi).at(X3Token.networks[5777].address)

  window.contract = contract
}

export default contract
