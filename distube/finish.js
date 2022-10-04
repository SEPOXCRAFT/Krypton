module.exports = async(client, queue) => {
	queue.textChannel.send("**Canciónes terminadas, saliendo del canal...**")
	client.music.voices.get(queue.guild)?.leave();
}