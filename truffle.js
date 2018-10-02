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
        const address_index = 3
        const provider = new HDWalletProvider(MMEMONIC, endpoint, address_index)

        console.log('[HDWallet] Endpoint is', endpoint)

        return provider
      },
      network_id: 42,
      gas: 4700000,
    },
  },
  rpc: {
    host: '127.0.0.1',
    port: 8545,
  },
}
