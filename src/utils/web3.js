import Web3 from 'web3'

let web3 = {}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (typeof web3 !== 'undefined') {
      console.debug('MetaMask is Present.')

      web3 = new Web3(web3.currentProvider)
    } else {
      console.warn('Please install MetaMask!')
    }
  })
}

export default web3
