const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const createSchedules = require('./createSchedules')

const client = new Client({
	authStrategy: new LocalAuth({ dataPath: 'whatsapp-session' }),
})

client.once('ready', async () => {
	client
		.getChats()
		.then((value) => {
			createSchedules(value)
		})
		.catch((e) => console.error('error', e))
		.finally(() => console.log('client connected'))
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
