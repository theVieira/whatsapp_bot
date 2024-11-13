module.exports = function sendMessage(chats, message) {
	chats.forEach((chat) => chat.sendMessage(message))
}
