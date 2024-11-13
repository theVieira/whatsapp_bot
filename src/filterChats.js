module.exports = function filterChats(allChats, findChats) {
	return allChats.filter((chat) => findChats.includes(chat.name))
}
