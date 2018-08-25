const Web3 = require('web3')
const Queue = require('p-queue')
const SerialPort = require('serialport')
const child = require('child_process')

const X3Token = require('../build/contracts/X3Token.json')

const queue = new Queue({concurrency: 1})

function getDevice() {
  const device = child
    .execSync('ls /dev | grep -i usb | tail -1')
    .toString()
    .trim()

  if (!process.env.DEVICE && !device) {
    console.info('[X3 Error] Device is not connected.')
    process.exit(0)
  }

  return `/dev/${device}`
}

const device = process.env.DEVICE || getDevice()

console.log('[X3] Using Device at:', device)

const port = new SerialPort(device, {baudRate: 9600})

const web3 = new Web3('wss://kovan.infura.io/ws')
// const web3 = new Web3('wss://pzcethnode.afourleaf.com:28546')

console.log('[X3] Connecting to Kovan Testnet')

const abi = X3Token.abi

const network = process.env.NETWORK || '42'
const address = X3Token.networks[network].address

const myContractInstance = new web3.eth.Contract(abi, address)

console.log('[X3] Contract Address is', address)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const sendToArduino = (strength, duration) =>
  new Promise((resolve, reject) => {
    console.log('[X3] Vibrating Event:', `#${strength},${duration}#`)

    port.write(`#${strength},${duration}#`, err => {
      if (err) return reject(err)
      resolve()
    })
  })

myContractInstance.events.VibratingEvent().on('data', async event => {
  const {duration, strength} = event.returnValues
  console.log('Event:', event.returnValues)

  await queue.add(async () => {
    await sendToArduino(strength, duration)

    const msec = parseInt(duration) + 400
    console.log('--- Sleeping for', msec, 'msec. ---')

    await sleep(msec)
  })

  console.log('--- Queue Completed ---')
})

port.on('error', err => console.warn('Error:', err.message))
