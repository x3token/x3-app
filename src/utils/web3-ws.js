import Web3 from 'web3'

let web3ws = {}

if (typeof window !== 'undefined') {
  web3ws = new Web3('wss://kovan.infura.io/ws')

  window.web3ws = web3ws
}

export default web3ws
