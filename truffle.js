module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    kovan: {
      provider() {
        const HDWalletProvider = require('truffle-hdwallet-provider')

        const {KEY, MMEMONIC} = process.env
        const endpoint = 'https://kovan.infura.io/v3/' + KEY
        const provider = new HDWalletProvider(MMEMONIC, endpoint, 3)

        console.log('[HDWallet] Endpoint is', endpoint)

        return provider
      },
      network_id: 3,
      gas: 4700000,
    },
  },
  rpc: {
    host: '127.0.0.1',
    port: 8545,
  },
}
