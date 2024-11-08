const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const dayjs = require('dayjs')
const { time } = require('./config/config.json')
const { groups, message } = require('./config/config.json')

const client = new Client({
	puppeteer: { args: ['--no-sandbox'] },
})

// Aux to send unique message
let i = 0

client.once('ready', async () => {
	console.log('client connected')

	const chats = await client.getChats()

	const filterGroups = chats.filter((chat) => groups.includes(chat.name))

	console.log('ready to send message')

	setInterval(() => {
		const date = new Date()
		const nowHour = dayjs(date).hour()
		const nowMin = dayjs(date).minute()
		const { hour, minute } = time

		if (nowHour == hour && nowMin == minute) {
			if (i == 0) {
				filterGroups.forEach((group) => group.sendMessage(message))
			}

			i = 1
		} else {
			i = 0
		}
	}, 1000)
})

client.on('qr', async (qr) => {
	console.log('generate qr code')

	qrcode.generate(qr, { small: true })
})

client.on('message', (message) => {
	if (message.body === '!ping') {
		client.sendMessage(message.from, 'pong')
	}
})

client.initialize()
