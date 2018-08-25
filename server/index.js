
const Web3 = require('web3')
const Queue = require('promise-queue')
Queue.configure(require('bluebird'))
const Promise = require('bluebird')
const SerialPort = require('serialport')

const port = new SerialPort('/dev/tty.usbmodem1421', {
  baudRate: 9600
})

const maxConcurrent = 1
const maxQueue = 5000
const queue = new Queue(maxConcurrent, maxQueue)

const sleep = ms => (new Promise(resolve => setTimeout(resolve, ms)))

let web3

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    console.log('Connect to kovan')
    web3 = new Web3('wss://pzcethnode.afourleaf.com:28546')
    // web3 = new Web3('wss://kovan.infura.io/ws')
}

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_duration",
				"type": "uint256"
			},
			{
				"name": "_strength",
				"type": "uint256"
			}
		],
		"name": "sendHappiness",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "strength",
				"type": "uint256"
			}
		],
		"name": "VibratingEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
/// @dev change address here
const address = '0x1d4832846d68ea2726adde1e3fe6137e2e78485d'
/// @dev change abi to use from traffle
const myContractInstance = new web3.eth.Contract(abi, address)

function sendToArduno (duration, strength) {
  console.log(`#${duration},${strength}#`)
  port.write(`#${duration},${strength}#`, function(err) {
    if (err) return console.log('Error on write: ', err.message)
    console.log('message written')
  })
}

myContractInstance.events.VibratingEvent()
  .on('data',  async (event) => {
    const duration = event.returnValues.duration
    const strength = event.returnValues.strength
    console.log(event.returnValues) // same results as the optional callback above
    await queue.add(async () => {
      console.log('Pending length', queue.getPendingLength())
      await sendToArduno(duration, strength)
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