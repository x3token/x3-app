import eth from './eth'

import X3Token from '../../contracts/X3Token.sol'

const contract = eth.contract(X3Token.abi).at(X3Token.networks[5777].address)

if (typeof window !== 'undefined') {
  window.contract = contract
}

export default contract
