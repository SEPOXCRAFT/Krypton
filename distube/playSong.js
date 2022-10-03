module.exports = async (queue, song) => {
	queue.message.reply("Now playing: "+song.name)
}