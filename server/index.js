const Web3 = require('web3')
const Queue = require('promise-queue')
const Promise = require('bluebird')
const SerialPort = require('serialport')
const child = require('child_process')

const X3Token = require('../build/contracts/X3Token.json')

Queue.configure(Promise)

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

const maxConcurrent = 1
const maxQueue = 5000

const queue = new Queue(maxConcurrent, maxQueue)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// web3 = new Web3('wss://kovan.infura.io/ws')
const web3 = new Web3('wss://pzcethnode.afourleaf.com:28546')

console.log('[X3] Connecting to Kovan Testnet')

const abi = X3Token.abi

const network = process.env.NETWORK || '42'
const address = X3Token.networks[network].address

const myContractInstance = new web3.eth.Contract(abi, address)

console.log('[X3] Contract Address is', address)

function sendToArduino(strength, duration) {
  console.log('[X3] Vibrating Event:', `#${strength},${duration}#`)

  port.write(`#${strength},${duration}#`, function(err) {
    if (err) return console.warn('Error on write:', err.message)

    console.log('message written')
  })
}

myContractInstance.events.VibratingEvent().on('data', async event => {
  const {duration, strength} = event.returnValues
  console.log('Event:', event.returnValues)

  async function handler() {
    console.log('Pending Queues:', queue.getPendingLength())
    await sendToArduino(strength, duration)
    await sleep(duration + 400)
  }

  await queue.add(handler)

  console.log('After Pending Queues:', queue.getPendingLength())
  console.log('After Q length', queue.getQueueLength())
})

port.on('error', err => console.warn('Error:', err.message))
