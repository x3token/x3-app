import Web3 from 'web3'

let web3 = {}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      console.info('MetaMask Instance has been registered:', web3)

      window.web3 = web3
    } else {
      console.warn('MetaMask not present!')
    }
  })
}

export default web3
