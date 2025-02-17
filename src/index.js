const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const cron = require('node-cron')
const { schedules, timezone } = require('../config.json')

const client = new Client({
	authStrategy: new LocalAuth({ dataPath: 'whatsapp-session' }),
})

client.once('ready', async () => {
	schedules.forEach((schedule) => {
		cron.schedule(
			schedule.time,
			() => {
				client.getChats().then((chats) => {
					chats
						.filter((chat) => schedule.chats.includes(chat.name))
						.filter((chat) => !chat.lastMessage.fromMe)
						.forEach((chat) => {
							chat.sendMessage(schedule.message)
						})
				})
			},
			{
				runOnInit: false,
				scheduled: true,
				timezone,
			}
		)
	})

	console.log('ok')
})

client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true })
})

client.on('message', (msg) => {
	if (msg.body == '!ping') {
		client.sendMessage(msg.from, 'pong')
	}
})

client.initialize()
