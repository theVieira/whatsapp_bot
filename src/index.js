const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const cron = require('node-cron')
const fs = require('node:fs')
const path = require('node:path')
const { schedules, timezone, media } = require('../config.json')

const client = new Client({
	authStrategy: new LocalAuth({ dataPath: 'whatsapp-session' }),
})

client.once('ready', async () => {
	const mediaPath = path.resolve(__dirname, '..', 'public', media)

	schedules.forEach((schedule) => {
		cron.schedule(
			schedule.time,
			() => {
				client.getChats().then((chats) => {
					chats
						.filter((chat) => schedule.chats.includes(chat.name))
						.filter((chat) => !chat.lastMessage.fromMe)
						.forEach((chat) => {
							if (fs.existsSync(mediaPath)) {
								const media = MessageMedia.fromFilePath(mediaPath)
								chat.sendMessage(media)
							} else {
								console.error('an error occurred when trying to send the image')
							}
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

	console.log('imagem a ser enviada ' + mediaPath)
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
