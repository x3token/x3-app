import eth from './eth'

import X3Token from '../../contracts/X3Token.sol'

console.log('X3Token', X3Token)

const contract = eth.contract(X3Token.abi).at(X3Token.networks[5777].address)

if (typeof window !== 'undefined') {
  window.X3Token = X3Token
  window.contract = contract
}

export default contract
