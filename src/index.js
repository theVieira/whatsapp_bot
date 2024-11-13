const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { schedules } = require('../config.json')
const createSchedules = require('./createSchedules')
const filterChats = require('./filterChats')

const client = new Client({
	authStrategy: new LocalAuth({ dataPath: 'whatsapp-session' }),
})

client.once('ready', async () => {
	console.log('Client is connected')

	client
		.getChats()
		.then((value) => {
			schedules.forEach((schedule) => {
				createSchedules(filterChats(value, schedule.chats))
			})
		})
		.catch((e) => console.error('error', e))
})

client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true })
})

client.on('message', (msg) => {
	if (msg.body == '!ping') {
		client.sendMessage(msg.from, 'ping')
	}
})

client.initialize()
