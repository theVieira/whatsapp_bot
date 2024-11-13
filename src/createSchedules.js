const { schedules, timezone } = require('../config.json')
const cron = require('node-cron')

module.exports = function createSchedules(chats) {
	schedules.forEach((schedule) => {
		cron.schedule(
			schedule.time,
			() => {
				chats
					.filter((chat) => schedule.chats.includes(chat.name))
					.forEach((chat) => chat.sendMessage(schedule.message))
			},
			{
				timezone,
				runOnInit: false,
				scheduled: true,
			}
		)
	})
}
