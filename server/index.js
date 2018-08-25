const Web3 = require('web3')
const Queue = require('promise-queue')
Queue.configure(require('bluebird'))
const Promise = require('bluebird')
const SerialPort = require('serialport')

const X3Token = require('../build/contracts/X3Token.json')

const device = process.env.DEVICE || '/dev/tty.usbmodem1421'

const port = new SerialPort(device, {baudRate: 9600})

const maxConcurrent = 1
const maxQueue = 5000
const queue = new Queue(maxConcurrent, maxQueue)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  console.log('Connect to kovan')
  web3 = new Web3('wss://pzcethnode.afourleaf.com:28546')
  // web3 = new Web3('wss://kovan.infura.io/ws')
}

const abi = X3Token.abi
/// @dev change address here
const network = process.env.NETWORK || '42'
const address = X3Token.networks[network].address
/// @dev change abi to use from traffle
const myContractInstance = new web3.eth.Contract(abi, address)

function sendToArduno(strength, duration) {
  console.log(`#${strength},${duration}#`)
  port.write(`#${strength},${duration}#`, function(err) {
    if (err) return console.log('Error on write: ', err.message)
    console.log('message written')
  })
}

myContractInstance.events.VibratingEvent().on('data', async event => {
  const duration = event.returnValues.duration
  const strength = event.returnValues.strength
  console.log(event.returnValues) // same results as the optional callback above
  await queue
    .add(async () => {
      console.log('Pending length', queue.getPendingLength())
      await sendToArduno(strength, duration)
      await sleep(duration)
    })
    .then(() => {
      console.log('After Pending length', queue.getPendingLength())
      console.log('After Q length', queue.getQueueLength())
    })
})

port.on('error', function(err) {
  console.log('Error: ', err.message)
})
