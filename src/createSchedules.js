const sendMessage = require('./sendMessage')
const { schedules, timezone } = require('../config.json')
const cron = require('node-cron')

module.exports = function createSchedules(chats) {
	schedules.forEach((schedule) => {
		cron.schedule(schedule.time, () => sendMessage(chats, schedule.message), {
			timezone,
		})
	})

	console.log('tasks scheduled')
}
